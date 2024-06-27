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
    <div className="block md:hidden">
      <Select
        onValueChange={handleFilterClick}
        defaultValue={paramsFilter || undefined}
      >
        <SelectTrigger className={cn("")}>
          <div className="line-clamp-1 flex-1 text-left">
            <SelectValue placeholder="Select a filter"></SelectValue>
          </div>
        </SelectTrigger>

        <SelectContent className="">
          <SelectGroup>
            {filters.map((item) => {
              return (
                <SelectItem value={item.value} key={item.name}>
                  {item.name}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
