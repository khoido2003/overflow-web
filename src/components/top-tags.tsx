"use client";

import Link from "next/link";
import { TopQuestionsLoading } from "./loading/top-questions-loading";
import { API_REQUEST_PREFIX } from "@/constants/fetch-request";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { ChevronRight } from "lucide-react";
import { Top5TagsParams } from "@/types/tag";

export const TopTags = () => {
  const session = useSession();

  const {
    data: topTags,
    isPending,
    isLoading,
  } = useQuery({
    queryKey: ["top-5-tags"],
    queryFn: async () => {
      const response = await fetch(`${API_REQUEST_PREFIX}/top-5-tags`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",

          Authorization: `Bearer ${session.data?.user.token}`,
        },
      });
      const data = await response.json();

      return data.data as Top5TagsParams[];
    },
    retry: 3,
    staleTime: 0,
  });

  console.log(topTags);

  if (isLoading || isPending)
    return (
      <div className="flex flex-col gap-2">
        <TopQuestionsLoading />
        <TopQuestionsLoading />
        <TopQuestionsLoading />
      </div>
    );
  return (
    <div className="mb-12 flex flex-col gap-5">
      <h3 className="text-2xl font-bold">Top Tags</h3>

      <div className="flex flex-col gap-2">
        {topTags?.map((tag) => {
          return (
            <Link
              className="flex items-center justify-between gap-12 p-2 hover:bg-zinc-300/90 dark:hover:bg-zinc-700/90"
              href={`/tags/${tag.id}`}
              key={tag.id}
            >
              <p className="rounded-xl bg-zinc-200 px-4 py-1 dark:bg-zinc-700">
                {" "}
                {tag.name}
              </p>

              <p className="font-semibold">{tag._count.tagOnQuestion}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
