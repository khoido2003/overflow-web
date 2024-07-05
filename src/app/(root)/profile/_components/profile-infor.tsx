"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";

import { getUserInfo } from "@/actions/user.action";

import { Button } from "@/components/ui/button";
import ProfileCard from "./profile-card";
import ProfileStats from "./profile-stats";
import ProfileNotFound from "./profile-not-found";
import UserProfileSkeleton from "./user-profile-skeleton";

interface ProfileInfoProps {
  userId: string;
}

const ProfileInfo = ({ userId }: ProfileInfoProps) => {
  const {
    data: user,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["user", userId],
    queryFn: async () => await getUserInfo(userId),
    staleTime: 0,
    retry: 3,
  });

  const session = useSession();

  if (isFetching || isLoading || !user) return <UserProfileSkeleton />;

  if (!user?.userInfo) return <ProfileNotFound />;

  return (
    <>
      <div className="flex justify-between gap-3 border-b border-gray-300 pb-5 text-[#212734] dark:border-whiteSecondary dark:text-whiteSecondary">
        <ProfileCard userInfo={user.userInfo} />

        {session.data?.user.id === user.userInfo.id && (
          <Button asChild>
            <Link href="/profile/edit">Edit Profile</Link>
          </Button>
        )}
      </div>
      <ProfileStats userStats={user.userStats} badgeCounts={user.badgeCounts} />
    </>
  );
};

export default ProfileInfo;
