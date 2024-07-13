import React from "react";

const UserTagSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="my-4 h-5 w-40 rounded-full bg-zinc-100 dark:bg-zinc-900"></div>
      <ul className="flex flex-col gap-4">
        <li className="flex items-center justify-between">
          <div className="h-8 w-20 rounded-lg bg-zinc-100 dark:bg-zinc-900"></div>
          <span className="h-3 w-9 rounded-full bg-zinc-100 dark:bg-zinc-900"></span>
        </li>
        <li className="flex items-center justify-between">
          <div className="h-8 w-20 rounded-lg bg-zinc-100 dark:bg-zinc-900"></div>
          <span className="h-3 w-9 rounded-full bg-zinc-100 dark:bg-zinc-900"></span>
        </li>
        <li className="flex items-center justify-between">
          <div className="h-8 w-20 rounded-lg bg-zinc-100 dark:bg-zinc-900"></div>
          <span className="h-3 w-9 rounded-full bg-zinc-100 dark:bg-zinc-900"></span>
        </li>
        <li className="flex items-center justify-between">
          <div className="h-8 w-20 rounded-lg bg-zinc-100 dark:bg-zinc-900"></div>
          <span className="h-3 w-9 rounded-full bg-zinc-100 dark:bg-zinc-900"></span>
        </li>
      </ul>
    </div>
  );
};

export default UserTagSkeleton;
