"use client";

import { API_REQUEST_PREFIX } from "@/constants/fetch-request";
import { GetBookmarkedQuestion } from "@/types/question.types";

import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useSearchParamsOptions } from "@/hooks/use-search-params-option";

import { BoormarkedQuestionCard } from "./bookmarked-question-card";
import NoResult from "@/components/no-result";
import PaginationBar from "@/components/pagination-bar";
import { QuestionLoading } from "@/components/loading/question-loading";
export const BookmarkedQuestionList = () => {
  const session = useSession();

  const { searchQuery, filter, pageParams, pageSize, searchParams } =
    useSearchParamsOptions({ defaultPageSize: 5 });

  const [currPage, setCurrPage] = useState(+pageParams);
  const [totalPage, setTotalPage] = useState<number>(1);

  const {
    data: bookmarkedQuestions,
    isPending,
    isFetching,
    isLoading,
    isFetched,
  } = useQuery({
    queryKey: [
      "Bookmarked questions",
      session.data?.user.id,
      searchParams.get("q"),
      searchParams.get("filter"),
      currPage,
    ],
    queryFn: async () => {
      const url = new URL(`${API_REQUEST_PREFIX}/questions/bookmark`);

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

      setTotalPage(Math.ceil(+data.results / +pageSize));
      return data.data as GetBookmarkedQuestion[];
    },
    retry: 3,
    staleTime: 0,
  });

  // Reset page when search or filter
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

  if (isPending || isLoading || isFetching) {
    return (
      <div className="flex flex-col items-center gap-4 sm:items-stretch">
        <QuestionLoading />
        <QuestionLoading />
        <QuestionLoading />
      </div>
    );
  }

  if (bookmarkedQuestions && bookmarkedQuestions.length === 0) {
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
    <div className="flex w-full flex-col gap-5">
      {bookmarkedQuestions?.map((question) => {
        return (
          <BoormarkedQuestionCard
            question={question}
            key={question.question.id}
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
