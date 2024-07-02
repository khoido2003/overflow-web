"use client";

import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

import { getUserInfo } from "@/actions/user.action";

import { QuestionLoading } from "@/components/loading/question-loading";
import ProfileCard from "../_components/profile-card";
import ProfileStats from "../_components/profile-stats";
import UserProfileSkeleton from "../_components/user-profile-skeleton";
import ProfileNotFound from "../_components/profile-not-found";
import { Button } from "@/components/ui/button";

interface PageProps {
  params: {
    id: string;
  };
}

const ProfilePage = ({ params }: PageProps) => {
  const {
    data: user,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["user", params.id],
    queryFn: async () => await getUserInfo(params.id),
    staleTime: 0,
    retry: 3,
  });

  const session = useSession();

  if (isFetching || isLoading) return <UserProfileSkeleton />;

  if (!user) return <ProfileNotFound />;

  return (
    <div className="flex flex-col">
      <div className="flex flex-col justify-between gap-3 border-b border-gray-300 pb-5 text-[#212734] dark:border-whiteSecondary dark:text-whiteSecondary lg:flex-row">
        <ProfileCard userInfo={user.userInfo} />

        {session.data?.user.id === user.userInfo.id && (
          <Button asChild>
            <Link href="/profile/edit">Edit Profile</Link>
          </Button>
        )}
      </div>

      <ProfileStats userStats={user.userStats} badgeCounts={user.badgeCounts} />

      <div className="mt-5 flex gap-10">
        <div className="flex-[2]">
          <h2 className="text-profile-secondary my-4">Top Posts</h2>
          <div className="flex flex-col gap-6">
            <QuestionLoading />
            <QuestionLoading />
            <QuestionLoading />
          </div>
        </div>

        <div className="flex-[1]">
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

export default ProfilePage;
