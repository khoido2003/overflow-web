"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEventHandler, useEffect, useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";

import qs from "query-string";
import { cn } from "@/lib/utils";
import { Input } from "./ui/input";
import { Search } from "lucide-react";

interface LocalSearchProps {
  placeholder?: string;
}

export const LocalSearch = ({ placeholder }: LocalSearchProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get the query filter on the url
  const q = searchParams.get("q");

  // value of the user's input search or take it from the url
  const [value, setValue] = useState(q || "");

  // Before manipulating the url -> debounce the value by 500ms to make sure not call database constantly
  const debounceValue = useDebounce(value, 500);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
  };

  // Manipulate url searchParams
  useEffect(() => {
    const query = {
      q: debounceValue,
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
  }, [debounceValue, router]);

  return (
    <div className="relative z-10 w-full flex-1">
      <Input
        className="relative h-14 rounded-lg border border-[#DCE3F1] bg-[#F4F6F8] p-4 pl-14 text-base dark:border-zinc-800 dark:bg-zinc-900"
        placeholder={placeholder}
        onChange={handleChange}
      />
      <Search className="absolute left-3 top-3 h-8 w-8 text-gray-400" />
    </div>
  );
};
