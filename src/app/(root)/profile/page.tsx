"use client";

import { useSession } from "next-auth/react";
import ProfileInfo from "./_components/profile-infor";
import NoResult from "@/components/no-result";
import UserQuestion from "./_components/user-question";
import UserProfileSkeleton from "./_components/user-profile-skeleton";
import { FilterBarMobile } from "@/components/filter-bar-mobile";
import { filterBarUserQuestion } from "@/constants";

const Page = () => {
  const session = useSession();

  if (session.status === "loading") return <UserProfileSkeleton />;

  if (session.status === "unauthenticated")
    return (
      <NoResult
        title="You’re not logged in!"
        description="Please login to view your profile."
        link="/auth/login"
        linkTitle="Log In Now"
      />
    );

  return (
    <div className="flex flex-col">
      <ProfileInfo userId={session.data?.user.id} />

      <div className="mt-5 flex gap-10">
        <div className="flex-[2]">
          <div className="my-5 flex items-center">
            <h2 className="text-profile-secondary">All Posts</h2>
            <div className="ml-auto">
              <FilterBarMobile filters={filterBarUserQuestion} />
            </div>
          </div>
          <UserQuestion userId={session.data?.user.id} />
        </div>

        <div className="hidden flex-[1] lg:block">
          <h2 className="text-profile-secondary my-4">Top Tags</h2>

          <ul className="flex flex-col gap-4">
            <li className="flex items-center justify-between">
              <p className="rounded-lg bg-zinc-200/80 px-4 py-2 text-sm text-[#7B8EC8] dark:bg-zinc-800/60">
                JavaScript
              </p>
              <p className="text-sm text-[#DCE3F1]">999</p>
            </li>
            <li className="flex items-center justify-between">
              <p className="rounded-lg bg-zinc-200/80 px-4 py-2 text-sm text-[#7B8EC8] dark:bg-zinc-800/60">
                JavaScript
              </p>
              <p className="text-sm text-[#DCE3F1]">999</p>
            </li>
            <li className="flex items-center justify-between">
              <p className="rounded-lg bg-zinc-200/80 px-4 py-2 text-sm text-[#7B8EC8] dark:bg-zinc-800/60">
                JavaScript
              </p>
              <p className="text-sm text-[#DCE3F1]">999</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Page;
