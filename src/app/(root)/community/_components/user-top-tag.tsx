"use client";

import TagCard from "@/components/tag-card";
import { API_REQUEST_PREFIX } from "@/constants/fetch-request";
import { TopUserTag } from "@/types/tag";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

const UserTopTag = ({ userId }: { userId: string }) => {
  const {
    data: tags,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["user-tag", userId],
    queryFn: async () => {
      const res = await fetch(`${API_REQUEST_PREFIX}/users/${userId}/tags`);
      console.log(userId);
      const data = await res.json();
      return data.data as TopUserTag[];
    },
  });

  if (isLoading || isFetching || !tags)
    return (
      <div className="flex animate-pulse gap-2">
        <div className="h-5 w-10 rounded-md bg-zinc-200 dark:bg-zinc-800"></div>
        <div className="h-5 w-10 rounded-md bg-zinc-200 dark:bg-zinc-800"></div>
        <div className="h-5 w-10 rounded-md bg-zinc-200 dark:bg-zinc-800"></div>
      </div>
    );

  if (tags.length === 0)
    return (
      <div className="inline-block rounded-lg bg-zinc-200 px-2 py-1 text-xs text-[#1DA1F2] shadow-sm dark:bg-zinc-800 dark:text-[#7B8EC8]">
        No tag yet!
      </div>
    );

  return (
    <div className="flex gap-2">
      {
        // only get top 3
        tags.slice(0, 3).map((tag) => (
          <span key={tag.id} className="inline-flex overflow-clip">
            <Link href={`/tags/${tag.id}`}>
              <div className="inline-block rounded-lg bg-zinc-200 px-2 py-1 text-xs text-[#1DA1F2] shadow-sm dark:bg-zinc-800 dark:text-[#7B8EC8]">
                {tag.name}
              </div>
            </Link>
          </span>
        ))
      }
    </div>
  );
};

export default UserTopTag;
