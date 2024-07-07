"use client";

import { API_REQUEST_PREFIX } from "@/constants/fetch-request";
import { UserAnswerQuestion } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { CommentDetail } from "./comment-detail";
import { GetAllAnswers } from "@/types/answer-question";
import { Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";

interface CommentsListProps {
  comments: UserAnswerQuestion[];
  questionId: string | number;
}

export const CommentsList = ({ comments, questionId }: CommentsListProps) => {
  const session = useSession();
  const searchParams = useSearchParams();

  const filter = searchParams.get("filter");

  const {
    data: answersList,
    isPending,
    isLoading,
    isFetched,
    isFetching,
  } = useQuery({
    queryKey: ["answer-list", questionId, filter],
    queryFn: async () => {
      const url = new URL(`${API_REQUEST_PREFIX}/answers/${questionId}`);
      if (filter) url.searchParams.append("filter", filter);

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.data?.user.token}`,
        },
        body: JSON.stringify({
          questionId,
        }),
      });
      const data = await response.json();
      return data.data as GetAllAnswers[];
    },
    staleTime: 0,
    retry: 3,
  });

  if (isFetched && comments.length === 0 && answersList?.length === 0) {
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

  if (isPending || isLoading || isFetching)
    return (
      <div className="flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );

  return (
    <div className="flex flex-col justify-center gap-8">
      {answersList?.map((answer) => {
        return <CommentDetail key={answer.id} answer={answer} />;
      })}
    </div>
  );
};
