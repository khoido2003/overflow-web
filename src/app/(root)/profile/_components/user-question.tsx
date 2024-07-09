"use client";

import { useSearchParams } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { GetQuestion, UpdateQuestionViews } from "@/types/question.types";

import {
  API_REQUEST_PREFIX,
  DEFAULT_QUESTION_PAGE_SIZE,
} from "@/constants/fetch-request";

import { QuestionCard } from "@/components/question-card";
import { useEffect, useState } from "react";
import { QuestionLoading } from "@/components/loading/question-loading";
import NoResult from "@/components/no-result";
import PaginationBar from "@/components/pagination-bar";
import { useSearchParamsOptions } from "@/hooks/use-search-params-option";
import { useSession } from "next-auth/react";

interface UserQuestionProps {
  userId: string;
}

const UserQuestion = ({ userId }: UserQuestionProps) => {
  const session = useSession();

  const { filter, pageParams, pageSize, searchParams } = useSearchParamsOptions(
    { defaultPageSize: DEFAULT_QUESTION_PAGE_SIZE },
  );

  const [currPage, setCurrPage] = useState<number>(pageParams);
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

  // Update question views
  const { mutate: updateQuestionViews } = useMutation({
    mutationFn: async ({ id }: UpdateQuestionViews) => {
      const response = await fetch(
        `${API_REQUEST_PREFIX}/questions/views/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.data?.user.token}`,
          },
          body: JSON.stringify({}),
        },
      );

      const data = await response.json();

      return data;
    },
    retry: 3,
    onSuccess: () => {},
    onError: () => {},
  });

  // reset currPage to 1 when filter changes
  useEffect(() => {
    setCurrPage(1);
  }, [filter]);

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

  if (isLoading || isFetching || !session)
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
          <QuestionCard
            onClick={() => updateQuestionViews({ id: question.id })}
            key={question.id}
            question={question}
          />
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
