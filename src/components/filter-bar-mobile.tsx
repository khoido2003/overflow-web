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

interface FilterBarMobileProps {
  filters: {
    name: string;
    value: string;
  }[];
}

export const FilterBarMobile = ({ filters }: FilterBarMobileProps) => {
  return (
    <div className="block md:hidden">
      <Select onValueChange={() => {}} defaultValue={undefined}>
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
