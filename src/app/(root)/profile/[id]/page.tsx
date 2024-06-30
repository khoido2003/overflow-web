"use client";

import { QuestionLoading } from "@/components/loading/question-loading";
import ProfileCard from "../_components/profile-card";
import StatsGroup from "../_components/stats-group";
import { useQuery } from "@tanstack/react-query";
import { API_REQUEST_PREFIX } from "@/constants/fetch-request";
import { UserProfile } from "@/types/user-profile.types";
import { useSession } from "next-auth/react";
import ProfileStats from "../_components/profile-stats";

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
    queryFn: async () => {
      const response = await fetch(`${API_REQUEST_PREFIX}/users/${params.id}`);
      const data = await response.json();
      return data.data as UserProfile;
    },
    staleTime: 0,
    retry: 3,
  });

  const session = useSession();
  console.log(session);

  if (isFetching || isLoading) return <div>Loading...</div>;

  if (!user) return <div>User not found</div>;

  return (
    <div className="flex flex-col">
      <div className="flex justify-between">
        <ProfileCard user={user} />

        {/* {session.data?.user.id === user.id && <div>Button</div>} */}
      </div>

      <div className="my-5 flex flex-col gap-4">
        <ProfileStats user={user} />
      </div>

      <div className="mt-5 flex gap-10">
        {/* POST ROW */}
        <div className="flex-[2]">
          <h2 className="text-profile-secondary my-4">Top Posts</h2>
          <div className="flex flex-col gap-6">
            <QuestionLoading />
            <QuestionLoading />
            <QuestionLoading />
          </div>
        </div>

        {/* TAG ROW */}
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
