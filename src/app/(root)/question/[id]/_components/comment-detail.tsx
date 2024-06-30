import { DisplayHtml } from "@/components/display-html";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatTimeToNow } from "@/lib/utils";
import { GetAllAnswers } from "@/types/answer-question";
import Image from "next/image";

interface CommentDetailProps {
  answer: GetAllAnswers;
}

export const CommentDetail = ({ answer }: CommentDetailProps) => {
  return (
    <div className="flex flex-col justify-center gap-4">
      {/* Author answer info */}
      <div className="flex items-center gap-1">
        <div className="flex items-center gap-2">
          <Avatar className="h-6 w-6 bg-zinc-100">
            <AvatarImage src={answer.user.image as string} />
            <AvatarFallback>
              <Image
                className="bg-white"
                src="/assets/images/user.png"
                fill
                alt="User avatar"
              />
              765rtdf
            </AvatarFallback>
          </Avatar>

          <p className="text-sm font-bold text-slate-600 dark:text-slate-400">
            {answer.user.name}{" "}
          </p>
        </div>

        <div className="text-sm text-slate-600 dark:text-slate-400">•</div>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          {formatTimeToNow(answer.createdAt)}
        </p>
      </div>

      {/* Content */}
      <DisplayHtml data={answer.content} />

      <div className="mt-3 h-[0.5px] w-full bg-slate-600/90 dark:bg-slate-400/90"></div>
    </div>
  );
};
