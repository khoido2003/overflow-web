import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

interface StatsCardProps {
  name?: string;
  isBadge?: boolean;
  icon?: string;
  badgeCount?: number;
  questionCount?: number | string;
  answerCount?: number | string;
}

const StatsCard = ({
  name,
  badgeCount,
  icon,
  isBadge,
  questionCount,
  answerCount,
}: StatsCardProps) => {
  return (
    <div
      className={cn(
        "flex items-center justify-center gap-10 rounded-xl bg-zinc-100 p-4 shadow-md dark:bg-zinc-900 md:p-6 lg:p-8",
      )}
    >
      {/* Number of question && answer */}
      {!isBadge && (
        <>
          <div className="text-center">
            <p className="text-2xl font-semibold text-[#0F1117] dark:text-whitePrimary">
              {questionCount}
            </p>
            <p className="text-sm font-normal text-[#212734] dark:text-[#DCE3F1]">
              Questions
            </p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-semibold text-[#0F1117] dark:text-whitePrimary">
              {answerCount}
            </p>
            <p className="text-sm font-normal text-[#212734] dark:text-[#DCE3F1]">
              Answer
            </p>
          </div>
        </>
      )}

      {/* Have the badge icon */}
      {isBadge && (
        <>
          <Image src={icon as string} alt="test" width={50} height={50} />
          <div>
            <p className="text-center text-xl font-semibold text-[#0F1117] dark:text-whitePrimary">
              {badgeCount}
            </p>
            <p className="text-sm font-normal text-[#212734] dark:text-[#DCE3F1]">
              {name}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default StatsCard;
