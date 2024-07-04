"use client";

import SearchWithFilter from "@/components/search-with-filter";
import { filterBarCommunity, filterBarTag } from "@/constants";
import { API_REQUEST_PREFIX } from "@/constants/fetch-request";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const TagPage = () => {
  const { data: tags, isLoading } = useQuery({
    queryKey: ["tags"],
    queryFn: async () => {
      const res = await fetch(`${API_REQUEST_PREFIX}/users`);
      const data = await res.json();
      return data.data;
    },
    staleTime: 0,
    retry: 3,
  });

  return (
    <div>
      <h1 className="text-3xl font-bold">All Tags</h1>

      <div className="my-5">
        {/* <SearchWithFilter
          placeholder="Search by tag name"
          filterOptions={filterBarTag}
        /> */}
      </div>
    </div>
  );
};

export default TagPage;
