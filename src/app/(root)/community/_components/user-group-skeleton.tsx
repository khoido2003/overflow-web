import React from "react";
import UserCardSkeleton from "./user-card-skeleton";

const UserGroupSkeleton = () => {
  return (
    <div className="mt-10 grid grid-cols-1 gap-3 gap-y-6 sm:grid-cols-2 md:gap-y-10 lg:grid-cols-3 xl:grid-cols-4">
      <UserCardSkeleton />
      <UserCardSkeleton />
      <UserCardSkeleton />
      <UserCardSkeleton />
      <UserCardSkeleton />
      <UserCardSkeleton />
      <UserCardSkeleton />
      <UserCardSkeleton />
    </div>
  );
};

export default UserGroupSkeleton;
