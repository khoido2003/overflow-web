import React from "react";

const TagInfoCardSkeleton = () => {
  return (
    <div className="flex flex-1 animate-pulse flex-col items-start gap-3 rounded-xl border border-[#C8CBD954] bg-white px-8 py-6 shadow-md dark:border-[#151821] dark:bg-[#0F1117] md:px-10 md:py-8">
      <div className="h-8 w-20 rounded-lg bg-gray-200 dark:bg-gray-500"></div>

      <div className="flex w-full items-center">
        <div className="h-2.5 w-32 rounded-full bg-gray-200 dark:bg-gray-700"></div>
        <div className="ms-2 h-2.5 w-24 rounded-full bg-gray-300 dark:bg-gray-600"></div>
        <div className="ms-2 h-2.5 w-full rounded-full bg-gray-300 dark:bg-gray-600"></div>
      </div>
      <div className="flex w-full max-w-[480px] items-center">
        <div className="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700"></div>
        <div className="ms-2 h-2.5 w-full rounded-full bg-gray-300 dark:bg-gray-600"></div>
        <div className="ms-2 h-2.5 w-24 rounded-full bg-gray-300 dark:bg-gray-600"></div>
      </div>
      <div className="flex w-full items-center">
        <div className="h-2.5 w-32 rounded-full bg-gray-200 dark:bg-gray-700"></div>
        <div className="ms-2 h-2.5 w-24 rounded-full bg-gray-300 dark:bg-gray-600"></div>
        <div className="ms-2 h-2.5 w-full rounded-full bg-gray-300 dark:bg-gray-600"></div>
      </div>
      <div className="flex w-full max-w-[480px] items-center">
        <div className="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700"></div>
        <div className="ms-2 h-2.5 w-full rounded-full bg-gray-300 dark:bg-gray-600"></div>
        <div className="ms-2 h-2.5 w-24 rounded-full bg-gray-300 dark:bg-gray-600"></div>
      </div>

      <p className="flex items-center gap-2">
        <span className="h-3 w-10 rounded-full bg-gray-200 dark:bg-gray-500"></span>{" "}
        <span className="h-3 w-10 rounded-full bg-gray-200 dark:bg-gray-500"></span>{" "}
      </p>
    </div>
  );
};

export default TagInfoCardSkeleton;
