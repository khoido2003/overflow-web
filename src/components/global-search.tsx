"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  ChangeEvent,
  ChangeEventHandler,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@/hooks/use-debounce";

import qs from "query-string";

import {
  CalendarIcon,
  CircleHelp,
  MessageSquareCode,
  RocketIcon,
  Search,
  SearchIcon,
  Sparkle,
  Sparkles,
  Tag,
  User,
} from "lucide-react";
import { FaceIcon } from "@radix-ui/react-icons";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "./ui/command";
import { API_REQUEST_PREFIX } from "@/constants/fetch-request";
import { Input } from "./ui/input";
import Link from "next/link";

// This is what we get from the server
/*
{
  "message": "Success",
  "results": 3,
  "data": [
      {
          "title": "Index configuration in Prisma",
          "id": "2bf485b7-eefc-453e-a185-794c606c86f6",
          "type": "question"
      },
      {
          "title": "Answer containing pris come from question: Index configuration in Prisma ",
          "id": "958e4fe4-607a-4ba8-bc08-9e88619fe497",
          "type": "answer"
      },
      {
          "title": "prisma",
          "id": "f542caf5-30e3-4793-8d16-2b2006b3ffac",
          "type": "tag"
      }
  ]
}
*/

type SearchResultType = {
  title: string;
  id: string;
  type: string;
};

export const GlobalSearch = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const query = searchParams.get("query");
  const type = searchParams.get("type");

  const {
    data: results,
    isFetched,
    isPending,
    isLoading,
  } = useQuery({
    queryKey: ["search", query, type],
    queryFn: async () => {
      const url = new URL(`${API_REQUEST_PREFIX}/global-search`);
      if (query) url.searchParams.append("query", query);
      if (type) url.searchParams.append("type", type);

      const response = await fetch(url);

      const data = await response.json();

      const results: SearchResultType[] | [] = data.data;
      return results;
    },

    retry: 3,
  });

  const [value, setValue] = useState(query || "");

  // Before manipulating the url -> debounce the value by 500ms to make sure not call database constantly
  const debounceValue = useDebounce(value, 500);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
  };

  // Manipulate the url when user search something
  useEffect(() => {
    const query = {
      query: debounceValue,
      type,
    };

    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      {
        skipNull: true,
        skipEmptyString: true,
      },
    );

    router.push(url);
  }, [debounceValue, router, type]);

  // Close the command list when click outside of it
  const commandRef = useRef<HTMLDivElement>(null);
  const [isCommandListOpen, setIsCommandListOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        commandRef.current &&
        !commandRef.current.contains(e.target as Node)
      ) {
        setIsCommandListOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [commandRef]);

  return (
    <Command
      className="relative hidden w-full max-w-[600px] overflow-visible sm:block"
      ref={commandRef}
    >
      {/* Do not use CommandInput from shadcn/ui here, that thing come out of the box with a find result from the CommandList which can cause some bugs */}
      <Input
        onFocus={() => setIsCommandListOpen(true)}
        value={value}
        onChange={handleChange}
        placeholder="Search anything..."
        className="min-h-[45px] rounded-lg"
      />
      <SearchIcon className="absolute right-3 top-[10px] h-5 w-5" />

      {isCommandListOpen && value.length > 0 ? (
        <CommandList className="absolute inset-x-0 top-[110%] z-50 bg-white shadow-md dark:bg-[#0C0A09] dark:shadow-none">
          {isLoading || (isPending && <div>Loading....</div>)}

          {(results?.length ?? 0) > 0 ? (
            <div className="p-3">
              <div className="mb-3 flex items-center justify-start gap-1">
                <Sparkles className="h-3 w-3 text-zinc-600 dark:text-zinc-400" />
                <p className="text-xs text-zinc-600 dark:text-zinc-400">
                  Suggestions
                </p>
              </div>

              {/* Suggestion list */}
              <div className="flex flex-col gap-4">
                {results!.map((result) => {
                  return (
                    <GlobalSearchItem
                      setIsCommandOpen={setIsCommandListOpen}
                      key={result.id}
                      result={result}
                    />
                  );
                })}
              </div>
            </div>
          ) : (
            <CommandEmpty>No results found.</CommandEmpty>
          )}
        </CommandList>
      ) : null}
    </Command>
  );
};

function GlobalSearchItem({
  result,
  setIsCommandOpen,
}: {
  result: SearchResultType;
  setIsCommandOpen: Dispatch<SetStateAction<boolean>>;
}) {
  let redirectLink = "";
  switch (result.type) {
    case "answer":
      redirectLink = `/question/${result.id}`;
      break;

    case "question":
      redirectLink = `/question/${result.id}`;
      break;

    case "tag":
      redirectLink = `/tags/${result.id}`;
      break;

    case "user":
      redirectLink = `/profile/${result.id}`;
      break;

    // Add more cases as needed
    default:
      break;
  }

  return (
    <Link href={redirectLink} onClick={() => setIsCommandOpen(false)}>
      <div className="flex flex-col items-start justify-center gap-1">
        <div className="flex items-center justify-start gap-1">
          {result.type === "tag" && <Tag className="h-3 w-3" />}
          {result.type === "answer" && (
            <MessageSquareCode className="h-7 w-7" />
          )}
          {result.type === "question" && <CircleHelp className="h-4 w-4" />}
          {result.type === "user" && <User className="h-4 w-4" />}
          <p className="line-clamp-1 text-xs font-semibold">{result.title}</p>
        </div>

        <p className="rounded-xl text-xs text-[#6D8EC8]">{result.type}</p>
      </div>
    </Link>
  );
}
