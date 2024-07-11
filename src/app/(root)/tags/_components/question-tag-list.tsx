"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import {
  API_REQUEST_PREFIX,
  DEFAULT_QUESTION_PAGE_SIZE,
} from "@/constants/fetch-request";

import { QuestionLoading } from "@/components/loading/question-loading";
import { QuestionCard } from "@/components/question-card";
import NoResult from "@/components/no-result";

import { GetQuestion, UpdateQuestionViews } from "@/types/question.types";
import { useSession } from "next-auth/react";
import { useSearchParamsOptions } from "@/hooks/use-search-params-option";
import { useEffect, useState } from "react";
import PaginationBar from "@/components/pagination-bar";

const QuestionTagList = ({ tagId }: { tagId: string }) => {
  const session = useSession();

  const { searchQuery, pageParams, pageSize, searchParams } =
    useSearchParamsOptions({ defaultPageSize: DEFAULT_QUESTION_PAGE_SIZE });
  const [currPage, setCurrPage] = useState(+pageParams);
  const [totalPage, setTotalPage] = useState<number>(1);

  const {
    data: questions,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["tag-question", tagId, searchParams.get("q"), currPage],
    queryFn: async () => {
      const url = new URL(`${API_REQUEST_PREFIX}/tags/${tagId}/questions`);

      if (searchQuery) url.searchParams.append("searchQuery", searchQuery);
      if (currPage) url.searchParams.append("page", currPage.toString());
      if (pageSize) url.searchParams.append("pageSize", pageSize.toString());

      const res = await fetch(url.toString());
      const data = await res.json();

      setTotalPage(Math.ceil(+data.data.questionsCount / +pageSize));
      console.log(data);

      return data.data.questions as GetQuestion[];
    },
    staleTime: 0,
    retry: 3,
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

  useEffect(() => {
    setCurrPage(1);
  }, [searchQuery]);

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

  if (isLoading || isFetching || !questions)
    return (
      <div className="flex animate-pulse flex-col gap-4">
        <QuestionLoading />
        <QuestionLoading />
        <QuestionLoading />
      </div>
    );

  if (questions.length === 0)
    return (
      <NoResult
        title="There's no question found with this tag!"
        description="Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. our query could be the next big thing others learn from. Get involved! 💡"
        link="/ask-question"
        linkTitle="Ask a Question"
      />
    );

  return (
    <>
      <div className="flex flex-col gap-5">
        {questions.map((question: GetQuestion) => {
          return (
            <QuestionCard
              key={question.id}
              onClick={() => updateQuestionViews({ id: question.id })}
              question={question}
            />
          );
        })}
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
    </>
  );
};

export default QuestionTagList;
