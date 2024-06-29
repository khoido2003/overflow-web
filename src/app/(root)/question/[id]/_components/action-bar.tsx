"use client";

import { formatAndDivideNumber } from "@/lib/utils";
import Image from "next/image";

interface ActionBarProps {
  upvotesCount: number;
  downvotesCount: number;
  hasUpvoted: boolean;
  hasDownvoted: boolean;
  hasBookmarked: boolean;
}

export const ActionBar = ({
  downvotesCount,
  hasBookmarked,
  hasDownvoted,
  hasUpvoted,
  upvotesCount,
}: ActionBarProps) => {
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
          alt="upvote"
          className="cursor-pointer"
        />
        <span className="flex aspect-square items-center justify-center rounded-md bg-zinc-200 px-2 text-center dark:bg-zinc-700">
          {formatAndDivideNumber(upvotesCount)}
        </span>
      </div>

      <Image
        src={
          hasBookmarked
            ? "/assets/icons/star-filled.svg"
            : "/assets/icons/star-red.svg"
        }
        width={18}
        height={18}
        alt="star"
        className="cursor-pointer"
      />
    </div>
  );
};
