"use client";

import { LocalSearch } from "@/components/local-search";
import { API_REQUEST_PREFIX } from "@/constants/fetch-request";
import { useQuery } from "@tanstack/react-query";
import UserCard from "./_components/user-card";
import { UserSimple } from "@/types/user-profile.types";

const CommunityPage = () => {
  const { data: users, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch(`${API_REQUEST_PREFIX}/users`);
      const data = await res.json();
      return data.data as UserSimple[];
    },
    staleTime: 0,
    retry: 3,
  });

  if (isLoading) return <div>Loading..</div>;

  if (!users) return <div>No users found</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold">All Users</h1>

      <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-5 lg:grid-cols-3 xl:grid-cols-4">
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default CommunityPage;
