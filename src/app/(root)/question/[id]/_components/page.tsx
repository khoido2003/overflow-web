"use client";

import { QuestionDetailLoading } from "@/components/loading/question-detail-loading";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { API_REQUEST_PREFIX } from "@/constants/fetch-request";
import { GetQuestion } from "@/types/question.types";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { ActionBar } from "./action-bar";
import { useSession } from "next-auth/react";
import { DisplayHtml } from "@/components/display-html";
import { Clock, Eye, MessageCircle } from "lucide-react";
import { formatTimeToNow } from "@/lib/utils";
import { TagsList } from "./tags-list";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface PageProps {
  params: {
    id: string;
  };
}

const Page = ({ params }: PageProps) => {
  const {
    data: question,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["question", params.id],
    queryFn: async () => {
      const response = await fetch(
        `${API_REQUEST_PREFIX}/questions/${params.id}`,
      );
      const data = await response.json();

      return data.data as GetQuestion;
    },
    staleTime: 0,
    retry: 3,
  });

  const session = useSession();

  console.log(question);

  if (isLoading || isFetching) return <QuestionDetailLoading />;

  // If the question is not valid or being deleted.
  if (!question)
    return (
      <div className="flex flex-col items-center justify-center gap-3">
        <p className="text-lg font-semibold sm:text-2xl">
          This question is not valid or no longer exists! 😥
        </p>

        <Link href="/">
          <Button>Return to Homepage</Button>
        </Link>

        <Image
          src="/assets/images/not-found.svg"
          height={300}
          width={300}
          className="mt-6 max-w-[400px]"
          alt="Not Found"
        />
      </div>
    );

  return (
    <div className="flex w-full flex-col justify-center gap-5 font-inter">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
        {/* Author info */}
        <div className="flex items-center justify-center gap-4">
          <Avatar className="h-8 w-8 bg-zinc-100">
            <AvatarImage src={question?.author.image as string} />
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

          <p className="font-bold text-slate-600 dark:text-slate-400">
            {question?.author.name}{" "}
          </p>
        </div>

        {/* Action bar: upvote, downvote, bookmark */}
        <ActionBar
          downvotesCount={question!.userDownvotes.length}
          upvotesCount={question!.userUpvotes.length}
          hasBookmarked={question!.userSavedQuestion.includes(
            session.data?.user.id,
          )}
          hasDownvoted={question!.userDownvotes.includes(session.data?.user.id)}
          hasUpvoted={question!.userUpvotes.includes(session.data?.user.id)}
        />
      </div>

      <h2 className="text-3xl font-bold">{question!.title}</h2>

      {/* Show question infomation */}
      <div className="mb-8 flex gap-8">
        <div className="flex items-center justify-center gap-1">
          <Clock className="h-4 w-4 text-slate-600 dark:text-slate-400" />
          <p className="text-sm text-slate-600 dark:text-slate-400">
            asked {formatTimeToNow(question.createdAt)}
          </p>
        </div>

        <div className="flex items-center justify-center gap-1">
          <MessageCircle className="h-4 w-4 text-slate-600 dark:text-slate-400" />
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {question.userAnswers.length} Answers
          </p>
        </div>

        <div className="flex items-center justify-center gap-1">
          <Eye className="h-4 w-4 text-slate-600 dark:text-slate-400" />
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {question.views} Views
          </p>
        </div>
      </div>

      {/* Show the content */}
      <DisplayHtml data={question!.content} />

      {/* Show tags */}
      <TagsList tags={question.tagOnQuestion} />

      {/* Show comments */}
    </div>
  );
};

export default Page;