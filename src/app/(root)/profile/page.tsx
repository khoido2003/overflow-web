"use client";

import { useSession } from "next-auth/react";
import UserProfileSkeleton from "./_components/user-profile-skeleton";
import { redirect } from "next/navigation";

const Page = () => {
  const session = useSession();

  if (session.status === "loading") return <UserProfileSkeleton />;

  if (session.status === "unauthenticated") redirect("/auth/login");

  return redirect(`/profile/${session.data?.user.id}`);
};

export default Page;
