"use client";

import {
  API_REQUEST_PREFIX,
  DEFAULT_QUESTION_FEED_SIZE,
} from "@/constants/fetch-request";
import { GetQuestion, UpdateQuestionViews } from "@/types/question.types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { QuestionCard } from "./question-card";
import { QuestionLoading } from "./loading/question-loading";
import NoResult from "./no-result";
import { useEffect, useState } from "react";
import PaginationBar from "./pagination-bar";
import { useSearchParamsOptions } from "@/hooks/use-search-params-option";

export const Feed = () => {
  const session = useSession();
  const { searchQuery, filter, pageParams, pageSize, searchParams } =
    useSearchParamsOptions({ defaultPageSize: DEFAULT_QUESTION_FEED_SIZE });
  const [currPage, setCurrPage] = useState(+pageParams);
  const [totalPage, setTotalPage] = useState<number>(1);

  const {
    data: questions,
    isFetching,
    isLoading,
  } = useQuery({
    queryKey: [
      "search-result",
      searchParams.get("q"),
      searchParams.get("filter"),
      currPage,
    ],
    queryFn: async () => {
      const url = new URL(`${API_REQUEST_PREFIX}/questions`);
      if (searchQuery) url.searchParams.append("searchQuery", searchQuery);
      if (filter) url.searchParams.append("filter", filter);
      if (currPage) url.searchParams.append("page", currPage.toString());
      if (pageSize) url.searchParams.append("pageSize", pageSize.toString());

      const response = await fetch(url.toString(), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.data?.user.token}`,
        },
      });

      const data = await response.json();

      // Calculate the total page
      setTotalPage(Math.ceil(+data.results / +pageSize));

      return data.data as GetQuestion[];
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
  }, [searchQuery, filter]);

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
        return (
          <QuestionCard
            onClick={() => updateQuestionViews({ id: question.id })}
            key={question.id}
            question={question}
          />
        );
      })}

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
