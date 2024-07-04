"use client";

import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";

interface FilterBarMobileProps {
  filters: {
    name: string;
    value: string;
  }[];
}

export const FilterBarMobile = ({ filters }: FilterBarMobileProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const paramsFilter = searchParams.get("filters");

  const handleFilterClick = (value: string) => {
    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query: {
          filter: value,
        },
      },
      {
        skipNull: true,
        skipEmptyString: true,
      },
    );

    router.push(url, { scroll: false });
  };
  return (
    <Select
      onValueChange={handleFilterClick}
      defaultValue={paramsFilter || undefined}
    >
      <SelectTrigger className="h-full gap-2 rounded-2xl border-[#DCE3F1] bg-[#F4F6F8] text-sm dark:border-[#151821] dark:bg-[#0F1117]">
        <SelectValue placeholder="Select a filter" />
      </SelectTrigger>

      <SelectContent
        className="rounded-xl border-[#DCE3F1] bg-[#F4F6F8] text-sm dark:border-[#151821] dark:bg-[#0F1117]"
        position="popper"
      >
        <SelectGroup>
          {filters.map((filter) => (
            <SelectItem
              key={filter.value}
              value={filter.value}
              className="cursor-pointer"
            >
              {filter.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
