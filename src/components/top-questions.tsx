"use client";

import { API_REQUEST_PREFIX } from "@/constants/fetch-request";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { TopQuestionsLoading } from "./loading/top-questions-loading";
import { GetTop5QuestionsParams } from "@/types/question.types";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export const TopQuestions = () => {
  const session = useSession();

  const {
    data: topQuestions,
    isPending,
    isLoading,
  } = useQuery({
    queryKey: ["top-5-questions"],
    queryFn: async () => {
      const response = await fetch(`${API_REQUEST_PREFIX}/top-5-questions`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",

          Authorization: `Bearer ${session.data?.user.token}`,
        },
      });
      const data = await response.json();

      return data.data as GetTop5QuestionsParams[];
    },
    retry: 3,
    staleTime: 0,
  });

  if (isLoading || isPending)
    return (
      <div className="flex flex-col gap-2">
        <TopQuestionsLoading />
        <TopQuestionsLoading />
        <TopQuestionsLoading />
      </div>
    );
  return (
    <div className="mb-4 flex flex-col gap-5">
      <h3 className="text-2xl font-bold">Top Questions</h3>

      <div className="flex flex-col gap-2">
        {topQuestions?.map((question) => {
          return (
            <Link
              className="flex items-center justify-between gap-12 p-2 hover:bg-zinc-300/90 dark:hover:bg-zinc-700/90"
              href={`/question/${question.id}`}
              key={question.id}
            >
              <p className="w-44 max-w-44">{question.title}</p>

              <ChevronRight className="h-5 w-5 font-bold" />
            </Link>
          );
        })}
      </div>
    </div>
  );
};
