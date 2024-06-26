"use client";

import { API_REQUEST_PREFIX } from "@/constants/fetch-request";
import { GetQuestion } from "@/types/question.types";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { QuestionCard } from "./question-card";
import { useSearchParams } from "next/navigation";

export const Feed = () => {
  const session = useSession();
  const searchParams = useSearchParams();

  console.log(searchParams.get("q"));

  const {
    data: questions,
    isFetching,
    isLoading,
    isFetched,
  } = useQuery({
    queryKey: ["search-result", searchParams.get("q")],
    queryFn: async () => {
      const response = await fetch(
        `${API_REQUEST_PREFIX}/questions?searchQuery=${searchParams.get("q") || ""}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.data?.user.token}`,
          },
        },
      );

      const data = await response.json();

      return data.data as GetQuestion[];
    },
    staleTime: 0,
  });

  if (isFetching || isLoading || !questions) return <div>Loading...</div>;

  return (
    <div className="flex flex-col gap-5">
      {questions.map((question: GetQuestion) => {
        return <QuestionCard key={question.id} question={question} />;
      })}
    </div>
  );
};
