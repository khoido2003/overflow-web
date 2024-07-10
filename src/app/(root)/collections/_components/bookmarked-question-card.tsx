import { formatTimeToNow } from "@/lib/utils";
import { GetBookmarkedQuestion } from "@/types/question.types";
import Image from "next/image";

import { Eye, MessageCircle, ThumbsUp } from "lucide-react";
import Link from "next/link";

import React from "react";
import TagCard from "@/components/tag-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MetricComponent } from "@/components/metric";

interface QuestionCardProps extends React.HTMLAttributes<HTMLDivElement> {
  question: GetBookmarkedQuestion;
  isBookmarked?: boolean;
}

export const BoormarkedQuestionCard = ({
  question,
  isBookmarked,
  onClick,
  ...props
}: QuestionCardProps) => {
  return (
    <div
      {...props}
      onClick={onClick}
      className="flex flex-col gap-6 rounded-lg bg-zinc-100 p-9 dark:bg-zinc-900 sm:px-11"
    >
      <div className="flex flex-col items-start gap-3">
        {/*  */}

        {/* Link to detail question by Id */}

        <div className="flex w-full items-center justify-between">
          <Link
            href={`/question/${question.question.id}`}
            className="block cursor-pointer"
          >
            <h3 className="line-clamp-1 text-xl font-bold">
              {question.question.title}
            </h3>
          </Link>

          <Image
            src="/assets/icons/star-filled.svg"
            width={17}
            height={17}
            alt="bookmarked"
            className="block"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {question.question.tagOnQuestion.map((item) => {
            return <TagCard key={item.tag.id} tag={item.tag} />;
          })}
        </div>
      </div>

      <div className="mt-2 flex w-full flex-wrap justify-between gap-4">
        {/* Link to user profile */}
        <Link
          href={`/profile/${question.question.author.id}`}
          className="cursor-pointer"
        >
          <div className="flex flex-wrap items-center justify-start gap-1">
            <Avatar className="h-6 w-6">
              <AvatarImage src={question.question.author.image!} className="" />
              <AvatarFallback>
                <Image src="/assets/images/user.png" fill alt="User avatar" />
              </AvatarFallback>
            </Avatar>
            <p className="text-xs font-bold">{question.question.author.name}</p>
            <span className="hidden sm:block">•</span>
            <p className="hidden text-xs sm:block">
              asked {formatTimeToNow(question.question.createdAt)}
            </p>
          </div>
        </Link>

        {/* Likes count */}
        <div className="flex items-center justify-start gap-4">
          <MetricComponent
            Icon={ThumbsUp}
            title="Votes"
            value={question.question._count.userUpvotes}
          />

          {/* Comments count */}
          <MetricComponent
            Icon={MessageCircle}
            title="Answers"
            value={question.question._count.userAnswers}
          />

          {/* View counts */}
          <MetricComponent
            Icon={Eye}
            title="Views"
            value={question.question.views}
          />
        </div>
      </div>
    </div>
  );
};
