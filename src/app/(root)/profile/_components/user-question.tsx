"use client";

import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { GetQuestion } from "@/types/question.types";

import {
  API_REQUEST_PREFIX,
  DEFAULT_QUESTION_PAGE_SIZE,
} from "@/constants/fetch-request";

import { QuestionCard } from "@/components/question-card";
import { useState } from "react";
import { QuestionLoading } from "@/components/loading/question-loading";
import NoResult from "@/components/no-result";
import PaginationBar from "@/components/pagination-bar";

interface UserQuestionProps {
  userId: string;
}

const UserQuestion = ({ userId }: UserQuestionProps) => {
  const searchParams = useSearchParams();
  const pageParams = searchParams.get("page") || 1;

  const pageSize = searchParams.get("pageSize") || DEFAULT_QUESTION_PAGE_SIZE;
  const filter = searchParams.get("filter");

  const [currPage, setCurrPage] = useState(+pageParams);
  const [totalPage, setTotalPage] = useState<number>(1);

  const {
    data: questions,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["user-questions", userId, currPage, searchParams.get("filter")],
    queryFn: async () => {
      const url = new URL(`${API_REQUEST_PREFIX}/users/${userId}/questions`);

      if (filter) url.searchParams.append("filter", filter);
      if (currPage) url.searchParams.append("page", currPage.toString());
      if (pageSize) url.searchParams.append("pageSize", pageSize.toString());

      const res = await fetch(url.toString());
      const data = await res.json();
      setTotalPage(Math.ceil(+data.results / +pageSize));

      return data.data as GetQuestion[];
    },
  });

  const handleNextPage = () => {
    setCurrPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    setCurrPage((prev) => prev - 1);
  };

  const handleSetPage = (newPage: number) => {
    if (newPage < 1 || newPage > totalPage) return;

    setCurrPage(newPage);
  };

  if (isLoading || isFetching)
    return (
      <div className="flex flex-col gap-4">
        <QuestionLoading />
        <QuestionLoading />
        <QuestionLoading />
      </div>
    );

  if (!questions)
    return (
      <NoResult
        title="There’s no question to show"
        description="Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. our query could be the next big thing others learn from. Get involved! 💡"
        link="/ask-question"
        linkTitle="Ask a Question"
      />
    );

  return (
    <div>
      <div className="flex flex-col gap-4">
        {questions.map((question) => (
          <QuestionCard key={question.id} question={question} />
        ))}
      </div>

      {totalPage > 1 && (
        <div className="my-5">
          <PaginationBar
            currPage={currPage}
            totalPage={totalPage}
            handlePrevPage={handlePrevPage}
            handleNextPage={handleNextPage}
            handleSetPage={handleSetPage}
          />
        </div>
      )}
    </div>
  );
};

export default UserQuestion;
