"use client";

import React from "react";
import { filterBarCommunity } from "@/constants";
import { LocalSearch } from "./local-search";
import { FilterBarMobile } from "./filter-bar-mobile";

interface SearchWithFilterProps {
  placeholder: string;
  filterOptions: typeof filterBarCommunity;
}

const SearchWithFilter = ({
  placeholder,
  filterOptions,
}: SearchWithFilterProps) => {
  return (
    <div className="flex w-full flex-col items-stretch gap-3 sm:flex-row sm:gap-5">
      <div className="w-full lg:w-3/5">
        <LocalSearch placeholder={placeholder} />
      </div>

      <div>
        <FilterBarMobile filters={filterOptions} />
      </div>
    </div>
  );
};

export default SearchWithFilter;
