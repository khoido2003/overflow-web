"use client";

import TagCard from "@/components/tag-card";
import { API_REQUEST_PREFIX } from "@/constants/fetch-request";
import { TopUserTag } from "@/types/tag";
import { useQuery } from "@tanstack/react-query";
import UserTagSkeleton from "./user-tag-skeleton";

interface UserTagProps {
  userId: string;
}

const UserTag = ({ userId }: UserTagProps) => {
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

  if (isLoading || isFetching || !tags) return <UserTagSkeleton />;

  if (tags.length === 0)
    return <div className="mt-32 text-center">No Tags Yet!</div>;

  return (
    <>
      <h2 className="text-profile-secondary my-4">Top Tags</h2>

      <ul className="flex flex-col gap-4">
        {tags.map((tag) => (
          <li key={tag.id} className="flex items-center justify-between">
            <TagCard tag={tag} />
            <span className="text-base font-bold text-primary">
              {tag.count}+
            </span>
          </li>
        ))}
      </ul>
    </>
  );
};

export default UserTag;
