"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter();

  const signOutFn = async () => {
    await signOut();
  };

  useEffect(() => {
    signOutFn();
    router.push("/");
  });
  return <div></div>;
}
