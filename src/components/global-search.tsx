"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  ChangeEventHandler,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useDebounce } from "@/hooks/use-debounce";

import qs from "query-string";

import {
  CircleHelp,
  Filter,
  Loader2,
  MessageSquareCode,
  SearchIcon,
  Sparkles,
  Tag,
  User,
} from "lucide-react";

import {
  Command,
  CommandEmpty,
  CommandList,
  CommandSeparator,
} from "./ui/command";
import { API_REQUEST_PREFIX } from "@/constants/fetch-request";
import { Input } from "./ui/input";
import Link from "next/link";
import { SearchType } from "@/constants";
import { cn } from "@/lib/utils";
import { UpdateQuestionViews } from "@/types/question.types";
import { useSession } from "next-auth/react";

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

  // Handle the value of the input
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

  // Maniplate the url when click on the search filter
  const handleFilterClick = (value: string | null) => {
    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query: {
          type: value,
        },
      },
      {
        skipNull: true,
        skipEmptyString: true,
      },
    );

    router.push(url);
  };

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
        <CommandList className="absolute inset-x-0 top-[120%] z-50 rounded-lg bg-white shadow-md dark:bg-[#0C0A09] dark:shadow-none">
          {/* Search filter */}
          <div className="flex flex-col items-start justify-center gap-4 px-3 py-5 md:flex-row md:items-center md:justify-start">
            <p className="flex items-center justify-center gap-1 text-xs text-zinc-600 dark:text-zinc-400">
              <Filter className="h-3 w-3" /> <span>Filter by: </span>
            </p>

            {/* Filter list */}
            <div className="flex flex-wrap items-center justify-start gap-3 md:gap-2">
              {SearchType.map((item) => {
                return (
                  <div
                    onClick={() => handleFilterClick(item.type)}
                    key={item.name}
                    className={cn(
                      "cursor-pointer rounded-xl bg-zinc-200 px-4 py-1 text-xs text-[#5A89C8] dark:bg-zinc-900",

                      type === item.type &&
                        "bg-zinc-500 text-white dark:bg-zinc-300 dark:text-black",
                    )}
                  >
                    {item.name}
                  </div>
                );
              })}
            </div>
          </div>

          <CommandSeparator />

          {/*  Loading state */}
          {(isLoading || isPending) && (
            <div className="flex w-full items-center justify-center p-4">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          )}

          {/* Results list */}
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
          ) : null}

          {/* If no results found */}
          {isFetched && results?.length === 0 && (
            <CommandEmpty>No results found.</CommandEmpty>
          )}
        </CommandList>
      ) : null}
    </Command>
  );
};

//////////////////////////////////////////////////////////

function GlobalSearchItem({
  result,
  setIsCommandOpen,
}: {
  result: SearchResultType;
  setIsCommandOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const session = useSession();

  const { mutate: updateQuestionViews } = useMutation({
    mutationFn: async ({ id }: UpdateQuestionViews) => {
      const response = await fetch(
        `${API_REQUEST_PREFIX}/questions/views/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.data?.user.token}`,
          },
          body: JSON.stringify({}),
        },
      );

      const data = await response.json();

      return data;
    },
    retry: 3,
    onSuccess: () => {},
    onError: () => {},
  });

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
    <Link
      href={redirectLink}
      onClick={() => {
        setIsCommandOpen(false);
        updateQuestionViews({ id: result.id });
      }}
    >
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
