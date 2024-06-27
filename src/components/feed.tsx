"use client";

import { API_REQUEST_PREFIX } from "@/constants/fetch-request";
import { GetQuestion } from "@/types/question.types";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { QuestionCard } from "./question-card";
import { useSearchParams } from "next/navigation";
import { QuestionLoading } from "./loading/question-loading";
import NoResult from "./no-result";

export const Feed = () => {
  const session = useSession();
  const searchParams = useSearchParams();

  const searchQuery = searchParams.get("q") || "";
  const filter = searchParams.get("filter") || "";

  const {
    data: questions,
    isFetching,
    isLoading,
    isFetched,
  } = useQuery({
    queryKey: [
      "search-result",
      searchParams.get("q"),
      searchParams.get("filter"),
    ],
    queryFn: async () => {
      const url = new URL(`${API_REQUEST_PREFIX}/questions`);
      if (searchQuery) url.searchParams.append("searchQuery", searchQuery);
      if (filter) url.searchParams.append("filter", filter);

      const response = await fetch(url.toString(), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.data?.user.token}`,
        },
      });

      const data = await response.json();

      return data.data as GetQuestion[];
    },
    staleTime: 0,
  });

  if (isFetching || isLoading || !questions)
    return (
      <div className="flex flex-col gap-4">
        <QuestionLoading />
        <QuestionLoading />
        <QuestionLoading />
      </div>
    );

  if (questions.length === 0) {
    return (
      <NoResult
        title="There’s no question to show"
        description="Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. our query could be the next big thing others learn from. Get involved! 💡"
        link="/ask-question"
        linkTitle="Ask a Question"
      />
    );
  }

  return (
    <div className="flex flex-col gap-5">
      {questions.map((question: GetQuestion) => {
        return <QuestionCard key={question.id} question={question} />;
      })}
    </div>
  );
};
