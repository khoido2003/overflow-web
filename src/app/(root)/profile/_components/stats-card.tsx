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
        "flex flex-1 items-center gap-4 rounded-xl border border-[#151821] bg-[#0F1117] p-8",
        !isBadge && "justify-between",
      )}
    >
      {/* Number of question && answer */}
      {!isBadge && (
        <>
          <div className="flex flex-col items-center">
            <p className="text-2xl font-semibold">{questionCount}</p>
            <p className="text-sm font-normal text-[#DCE3F1]">Questions</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-2xl font-semibold">{answerCount}</p>
            <p className="text-sm font-normal text-[#DCE3F1]">Answer</p>
          </div>
        </>
      )}

      {/* Have the badge icon */}
      {isBadge && (
        <>
          <Image src={icon as string} alt="test" width={50} height={50} />
          <div>
            <p className="text-xl font-semibold">{badgeCount}</p>
            <p className="text-sm font-normal text-[#DCE3F1]">{name}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default StatsCard;
