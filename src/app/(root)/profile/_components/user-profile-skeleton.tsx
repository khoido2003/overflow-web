import { CalendarDays, Link, MapPin } from "lucide-react";
import Image from "next/image";
import React from "react";

const UserProfileSkeleton = () => {
  return (
    <div className="flex animate-pulse flex-col">
      <div className="flex justify-between border-b border-gray-300 pb-5 dark:border-whiteSecondary">
        {/* Profile Card */}
        <div>
          <div className="flex flex-col gap-3 text-whiteSecondary lg:flex-row lg:items-center lg:gap-5">
            <div>
              <Image
                src="/assets/images/user.png"
                alt="Avatar Image"
                width={140}
                height={140}
                className="h-[100px] w-[100px] rounded-full border-[3px] border-primary object-center opacity-50 dark:opacity-100 lg:h-[140px] lg:w-[140px]"
              />
            </div>
            <div className="relative flex flex-col gap-5 lg:gap-5">
              <div>
                <div className="mb-2 h-5 w-60 rounded-full bg-gray-300 dark:bg-gray-700"></div>
                <div className="h-3 w-32 rounded-full bg-gray-200 dark:bg-gray-700"></div>
              </div>

              <ul className="flex flex-col items-start gap-2 md:flex-row md:items-center md:gap-4 lg:gap-6">
                <li className="flex items-center gap-2 text-base">
                  <span>
                    <Link className="h-4 w-4 text-purpleLink" />
                  </span>
                  <span className="h-3 w-20 rounded-full bg-gray-200 dark:bg-gray-700"></span>
                </li>
                <li className="flex items-center gap-2 text-base">
                  <span>
                    <MapPin className="h-4 w-4 text-purpleLink" />
                  </span>
                  <span className="h-3 w-20 rounded-full bg-gray-200 dark:bg-gray-700"></span>
                </li>
                <li className="flex items-center gap-2 text-base">
                  <span>
                    <CalendarDays className="h-4 w-4 text-purpleLink" />
                  </span>
                  <span className="h-3 w-20 rounded-full bg-gray-200 dark:bg-gray-700"></span>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-5 flex flex-col gap-1">
            <div className="h-3 w-full rounded-full bg-gray-200 dark:bg-gray-700"></div>
            <div className="h-3 w-full rounded-full bg-gray-200 dark:bg-gray-700"></div>
          </div>
        </div>
      </div>

      {/* PROFILE STATS */}
      <div className="my-10 flex flex-col gap-2 lg:gap-4">
        <div className="h-4 w-20 rounded-full bg-gray-200 dark:bg-gray-700"></div>

        <div className="flex flex-col items-stretch justify-between gap-5 md:flex-row lg:gap-5">
          <div className="flex flex-1 flex-wrap items-center justify-center gap-10 rounded-xl border border-[#C8CBD954] bg-whitePrimary p-4 shadow-md dark:border-[#151821] dark:bg-[#0F1117] md:gap-4 md:p-6 lg:p-8">
            <div className="h-20 w-20 rounded-full bg-gray-200 dark:bg-gray-700"></div>
            <div className="flex flex-col items-center">
              <div className="mb-1 h-5 w-10 rounded-full bg-gray-200 dark:bg-gray-700"></div>
              <div className="h-3 w-20 rounded-full bg-gray-200 dark:bg-gray-700"></div>
            </div>
          </div>

          <div className="flex flex-1 flex-wrap items-center justify-center gap-10 rounded-xl border border-[#C8CBD954] bg-whitePrimary p-4 shadow-md dark:border-[#151821] dark:bg-[#0F1117] md:gap-4 md:p-6 lg:p-8">
            <div className="h-20 w-20 rounded-full bg-gray-200 dark:bg-gray-700"></div>
            <div className="flex flex-col items-center">
              <div className="mb-1 h-5 w-10 rounded-full bg-gray-200 dark:bg-gray-700"></div>
              <div className="h-3 w-20 rounded-full bg-gray-200 dark:bg-gray-700"></div>
            </div>
          </div>
          <div className="flex flex-1 flex-wrap items-center justify-center gap-10 rounded-xl border border-[#C8CBD954] bg-whitePrimary p-4 shadow-md dark:border-[#151821] dark:bg-[#0F1117] md:gap-4 md:p-6 lg:p-8">
            <div className="h-20 w-20 rounded-full bg-gray-200 dark:bg-gray-700"></div>
            <div className="flex flex-col items-center">
              <div className="mb-1 h-5 w-10 rounded-full bg-gray-200 dark:bg-gray-700"></div>
              <div className="h-3 w-20 rounded-full bg-gray-200 dark:bg-gray-700"></div>
            </div>
          </div>
          <div className="flex flex-1 flex-wrap items-center justify-center gap-10 rounded-xl border border-[#C8CBD954] bg-whitePrimary p-4 shadow-md dark:border-[#151821] dark:bg-[#0F1117] md:gap-4 md:p-6 lg:p-8">
            <div className="h-20 w-20 rounded-full bg-gray-200 dark:bg-gray-700"></div>
            <div className="flex flex-col items-center">
              <div className="mb-1 h-5 w-10 rounded-full bg-gray-200 dark:bg-gray-700"></div>
              <div className="h-3 w-20 rounded-full bg-gray-200 dark:bg-gray-700"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileSkeleton;
