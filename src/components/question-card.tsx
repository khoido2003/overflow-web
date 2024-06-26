import { formatTimeToNow } from "@/lib/utils";
import { GetQuestion } from "@/types/question.types";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Metric } from "@/constants";
import { MetricComponent } from "./metric";
import { Eye, MessageCircle, ThumbsUp } from "lucide-react";
import Link from "next/link";

interface QuestionCardProps {
  question: GetQuestion;
}

export const QuestionCard = ({ question }: QuestionCardProps) => {
  return (
    <div className="flex flex-col gap-6 rounded-lg bg-zinc-100 p-9 dark:bg-zinc-900 sm:px-11">
      <div className="flex flex-col items-start gap-3">
        {/*  */}

        {/* Link to detail question by Id */}
        <Link href={`/question/${question.id}`} className="cursor-pointer">
          <h3 className="line-clamp-1 text-xl font-bold">{question.title}</h3>
        </Link>
        <div className="flex items-center gap-2">
          {question.tagOnQuestion.map((item) => {
            return (
              <Link key={item.tag.id} href={`/tag/${item.tag.id}`}>
                <div className="rounded-lg bg-zinc-200/80 px-4 py-2 text-sm text-[#7B8EC8] dark:bg-zinc-800/60">
                  {item.tag.name}
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {/* Link to user profile */}
        <Link
          href={`/profile/${question.author.id}`}
          className="cursor-pointer"
        >
          <div className="flex items-center justify-start gap-1">
            <Avatar className="h-6 w-6">
              <AvatarImage src={question.author.image!} className="" />
              <AvatarFallback>
                <Image src="/assets/images/user.png" fill alt="User avatar" />
              </AvatarFallback>
            </Avatar>
            <p className="text-xs font-bold">{question.author.name}</p>
            <span>•</span>
            <p className="text-xs">
              asked {formatTimeToNow(question.createdAt)}
            </p>
          </div>
        </Link>

        {/* Likes count */}
        <div className="flex items-center justify-start gap-4">
          <MetricComponent
            Icon={ThumbsUp}
            title="Votes"
            value={question.userUpvotes.length}
          />

          {/* Comments count */}
          <MetricComponent
            Icon={MessageCircle}
            title="Answers"
            value={question.userAnswers.length}
          />

          {/* View counts */}
          <MetricComponent Icon={Eye} title="Views" value={question.views} />
        </div>
      </div>
    </div>
  );
};
