"use client";

import { formatAndDivideNumber } from "@/lib/utils";
import Image from "next/image";

interface ActionBarAnswerProps {
  upvotesCount: number;
  downvotesCount: number;
  hasUpvoted: boolean;
  hasDownvoted: boolean;
}

export const ActionBarAnswer = ({
  downvotesCount,
  hasDownvoted,
  hasUpvoted,
  upvotesCount,
}: ActionBarAnswerProps) => {
  return (
    <div className="flex items-center justify-center gap-4">
      {/* Upvotes count*/}
      <div className="flex items-center justify-center gap-1">
        <Image
          src={
            hasUpvoted
              ? "/assets/icons/upvoted.svg"
              : "/assets/icons/upvote.svg"
          }
          width={18}
          height={18}
          alt="upvote"
          className="cursor-pointer"
        />
        <span className="flex aspect-square items-center justify-center rounded-md bg-zinc-200 px-2 text-center dark:bg-zinc-700">
          {formatAndDivideNumber(upvotesCount)}
        </span>
      </div>

      {/* Downvotes count*/}
      <div className="flex items-center justify-center gap-1">
        <Image
          src={
            hasUpvoted
              ? "/assets/icons/downvoted.svg"
              : "/assets/icons/downvote.svg"
          }
          width={18}
          height={18}
          alt="downvote"
          className="cursor-pointer"
        />
        <span className="flex aspect-square items-center justify-center rounded-md bg-zinc-200 px-2 text-center dark:bg-zinc-700">
          {formatAndDivideNumber(downvotesCount)}
        </span>
      </div>
    </div>
  );
};
