"use client";
import { logOut } from "@/actions/logout";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Page = () => {
  const onClick = () => {
    logOut();

    toast.success("Sign out successfully");
  };

  return (
    <div className="h-[2000px]">
      <Button onClick={onClick}>Sign out</Button>
    </div>
  );
};

export default Page;
