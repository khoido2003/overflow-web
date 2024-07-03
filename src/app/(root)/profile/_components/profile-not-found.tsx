import React from "react";
import { Suspense } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const ProfileNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <p className="text-lg font-semibold sm:text-2xl">
        This user is not valid or no longer exists! 😥
      </p>

      <Link href="/">
        <Button>Return to Homepage</Button>
      </Link>

      <Image
        src="/assets/images/not-found.svg"
        height={300}
        width={300}
        className="mt-6 max-w-[400px]"
        alt="Not Found"
      />
    </div>
  );
};

export default ProfileNotFound;
