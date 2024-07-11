"use client";

import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  API_REQUEST_PREFIX,
  DEFAULT_COMMUNITY_PAGE_SIZE,
} from "@/constants/fetch-request";

import { useSearchParamsOptions } from "@/hooks/use-search-params-option";

import { UserSimple } from "@/types/user-profile.types";

import NoResult from "@/components/no-result";
import UserCard from "./user-card";
import UserGroupSkeleton from "./user-group-skeleton";
import PaginationBar from "@/components/pagination-bar";

const UserGroup = () => {
  const { searchQuery, filter, pageParams, pageSize, searchParams } =
    useSearchParamsOptions({ defaultPageSize: DEFAULT_COMMUNITY_PAGE_SIZE });

  const [currPage, setCurrPage] = useState<number>(pageParams);
  const [totalPage, setTotalPage] = useState<number>(1);

  const {
    data: users,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: [
      "community",
      searchParams.get("q"),
      searchParams.get("filter"),
      currPage,
    ],
    queryFn: async () => {
      const url = new URL(`${API_REQUEST_PREFIX}/users`);

      if (searchQuery) url.searchParams.append("searchQuery", searchQuery);
      if (filter) url.searchParams.append("filter", filter);
      if (currPage) url.searchParams.append("page", currPage.toString());
      if (pageSize) url.searchParams.append("pageSize", pageSize.toString());

      const res = await fetch(url.toString());
      const data = await res.json();

      setTotalPage(Math.ceil(+data.results / pageSize));
      return data.data as UserSimple[];
    },
    staleTime: 0,
    retry: 3,
  });

  // reset currPage to 1 when filter changes
  useEffect(() => {
    setCurrPage(1);
  }, [filter, searchQuery]);

  const handleNextPage = () => {
    setCurrPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    setCurrPage((prev) => prev - 1);
  };

  const handleSetPage = (newPage: number) => {
    if (newPage < 1 || newPage > totalPage) return;

    setCurrPage(newPage);
  };

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
    <section>
      <div className="mt-10 grid grid-cols-1 gap-3 gap-y-6 sm:grid-cols-2 md:gap-y-10 lg:grid-cols-3 xl:grid-cols-4">
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>

      {totalPage > 1 && (
        <div className="my-5 md:my-10">
          <PaginationBar
            currPage={currPage}
            totalPage={totalPage}
            handlePrevPage={handlePrevPage}
            handleNextPage={handleNextPage}
            handleSetPage={handleSetPage}
          />
        </div>
      )}
    </section>
  );
};

export default UserGroup;
