import { UserAnswerQuestion } from "@prisma/client";
import Image from "next/image";

interface CommentsListProps {
  comments: UserAnswerQuestion[];
}

export const CommentsList = ({ comments }: CommentsListProps) => {
  if (comments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4">
        <p className="text-lg text-slate-600 dark:text-slate-400">
          It’s quiet here... too quiet. Start the conversation! 💬
        </p>

        <Image
          src="/assets/images/empty-2.svg"
          alt="Empty list"
          height={30}
          width={30}
          className="w-[200px] max-w-full"
        />
      </div>
    );
  }

  return <div></div>;
};
