import Image from "next/image";
import React from "react";

const JobItemSkeleton = () => {
  return (
    <div className="flex animate-pulse gap-6 rounded-lg bg-zinc-100 p-9 dark:bg-zinc-900">
      <Image
        src="/assets/images/user-pro.png"
        alt="Company logo"
        width={64}
        height={64}
        className="hidden h-16 w-16 rounded-full sm:block"
        loading="lazy"
      />

      <div className="flex w-full flex-col gap-5">
        <div className="flex w-full flex-col">
          <div className="flex flex-col items-start gap-2 lg:flex-row lg:items-center lg:gap-4">
            <div className="h-6 w-52 rounded-full bg-gray-200 dark:bg-gray-700"></div>
            <span className="h-6 w-20 rounded-lg bg-gray-200 dark:bg-gray-700"></span>
          </div>

          <div className="mt-2 w-full">
            <div className="h-4 w-full rounded-full bg-gray-200 dark:bg-gray-700 lg:w-4/5"></div>
            <div className="mt-1 h-4 w-full rounded-full bg-gray-200 dark:bg-gray-700 lg:w-4/5"></div>
          </div>
        </div>

        <div className="flex flex-col items-start gap-5 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-2 text-[#1DA1F2] dark:text-[#7B8EC8] md:flex-row md:gap-5">
            <div className="flex items-center gap-2 text-sm uppercase">
              <div className="h-6 w-6 rounded-xl bg-gray-200 dark:bg-gray-700"></div>
              <div className="h-5 w-20 rounded-full bg-gray-200 dark:bg-gray-700"></div>
            </div>

            <div className="flex items-center gap-2 text-sm uppercase">
              <div className="h-6 w-6 rounded-xl bg-gray-200 dark:bg-gray-700"></div>
              <div className="h-5 w-20 rounded-full bg-gray-200 dark:bg-gray-700"></div>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end font-semibold text-primary">
            <div className="h-6 w-20 rounded-xl bg-gray-200 dark:bg-gray-700"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobItemSkeleton;
