"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { API_REQUEST_PREFIX } from "@/constants/fetch-request";
import TagCard from "@/components/tag-card";
import NoResult from "@/components/no-result";
import { TagInfo } from "@/types/tag";
import TagInfoCard from "./tag-info-card";
import TagFeedSkeleton from "./tag-feed-skeleton";

const TagFeed = () => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("q") || "";
  const filter = searchParams.get("filter") || "";

  const {
    data: tags,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["tags", searchParams.get("q"), searchParams.get("filter")],
    queryFn: async () => {
      const url = new URL(`${API_REQUEST_PREFIX}/tags`);
      if (searchQuery) url.searchParams.append("searchQuery", searchQuery);
      if (filter) url.searchParams.append("filter", filter);

      const res = await fetch(url.toString());
      const data = await res.json();
      return data.data as TagInfo[];
    },
    staleTime: 0,
    retry: 3,
  });

  if (isLoading || isFetching || !tags) return <TagFeedSkeleton />;

  if (tags.length === 0)
    return (
      <NoResult
        title="No tags found!"
        description="Start asking and connect with other users to share your thoughts and ideas 🚀"
        link="/ask-question"
        linkTitle="Ask Now"
      />
    );

  return (
    <div className="mt-10 grid grid-cols-1 gap-3 gap-y-6 sm:grid-cols-2 md:gap-y-10 lg:grid-cols-3 xl:grid-cols-4">
      {tags.map((tag) => (
        <TagInfoCard key={tag.id} tag={tag} />
      ))}
    </div>
  );
};

export default TagFeed;
