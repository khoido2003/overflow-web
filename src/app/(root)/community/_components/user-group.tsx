"use client";

import { UserSimple } from "@/types/user-profile.types";
import React from "react";
import UserCard from "./user-card";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { API_REQUEST_PREFIX } from "@/constants/fetch-request";
import NoResult from "@/components/no-result";
import UserGroupSkeleton from "./user-group-skeleton";

const UserGroup = () => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("q") || "";
  const filter = searchParams.get("filter") || "";

  const {
    data: users,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["users", searchParams.get("q"), searchParams.get("filter")],
    queryFn: async () => {
      const url = new URL(`${API_REQUEST_PREFIX}/users`);
      if (searchQuery) url.searchParams.append("searchQuery", searchQuery);
      if (filter) url.searchParams.append("filter", filter);

      const res = await fetch(url.toString());
      const data = await res.json();
      return data.data as UserSimple[];
    },
    staleTime: 0,
    retry: 3,
  });

  if (isLoading || isFetching || !users) return <UserGroupSkeleton />;

  if (users?.length === 0)
    return (
      <NoResult
        title="There’s no user found!"
        description="Joined now and start connecting with other users to share your thoughts and ideas 🚀"
        link="/auth/register"
        linkTitle="Sign Up Now"
      />
    );

  return (
    <div className="mt-10 grid grid-cols-1 gap-3 gap-y-6 sm:grid-cols-2 md:gap-y-10 lg:grid-cols-3 xl:grid-cols-4">
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
};

export default UserGroup;
