import Image from "next/image";
import React from "react";

const UserCardSkeleton = () => {
  return (
    <div className="flex flex-1 animate-pulse flex-col items-center justify-between gap-3 rounded-xl border border-[#C8CBD954] bg-white px-8 py-6 shadow-md dark:border-[#151821] dark:bg-[#0F1117] md:gap-5 md:px-10 md:py-8">
      <div className="flex flex-col items-center gap-2 md:gap-4">
        <Image
          src={"/assets/images/user.png"}
          alt="User Avater"
          width={100}
          height={100}
          className="h-[100px] w-[100px] rounded-full opacity-50 dark:opacity-100"
        />
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="h-4 w-20 rounded-full bg-gray-300 dark:bg-gray-500"></div>
          <div className="h-3 w-10 rounded-full bg-gray-200 dark:bg-gray-500"></div>
        </div>
      </div>
      <div>
        <span>HTML</span>
        <span>HTML</span>
        <span>HTML</span>
      </div>
    </div>
  );
};

export default UserCardSkeleton;
