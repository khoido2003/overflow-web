"use client";

import { useQuery } from "@tanstack/react-query";

import { TagOnQuestion } from "@/types/tag";
import { API_REQUEST_PREFIX } from "@/constants/fetch-request";

import { QuestionLoading } from "@/components/loading/question-loading";
import { QuestionCard } from "@/components/question-card";
import NoResult from "@/components/no-result";
import { LocalSearch } from "@/components/local-search";
import { useSearchParams } from "next/navigation";

interface PageProps {
  params: {
    id: string;
  };
}

const TagIdPage = ({ params }: PageProps) => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("q") || "";
  const page = searchParams.get("page") || "1";
  const pageSize = searchParams.get("limit") || "10";

  const {
    data: tagOnQuestions,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["tag", params.id, searchParams.get("q")],
    queryFn: async () => {
      const url = new URL(`${API_REQUEST_PREFIX}/tags/${params.id}`);
      if (searchQuery) url.searchParams.append("searchQuery", searchQuery);
      if (page) url.searchParams.append("page", page);
      if (pageSize) url.searchParams.append("limit", pageSize);

      const res = await fetch(url.toString());
      const data = await res.json();

      return data.data as TagOnQuestion;
    },
  });

  if (isLoading || isFetching)
    return (
      <div className="animate-pulse">
        <div className="mb-8 h-12 w-32 rounded-lg bg-zinc-200 dark:bg-zinc-900"></div>
        <div className="mb-8 mt-4 h-10 w-full rounded-full bg-zinc-200 dark:bg-zinc-900 lg:w-3/5"></div>
        <div className="flex flex-col gap-4">
          <QuestionLoading />
          <QuestionLoading />
          <QuestionLoading />
        </div>
      </div>
    );

  if (!tagOnQuestions)
    return (
      <NoResult
        title="There's no question found with this tag!"
        description="Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. our query could be the next big thing others learn from. Get involved! 💡"
        link="/ask-question"
        linkTitle="Ask a Question"
      />
    );

  return (
    <div>
      <h2 className="inline-block rounded-lg text-3xl font-bold text-primary">
        {tagOnQuestions.tag.name}
      </h2>

      <div className="mb-8 mt-4 lg:w-3/5">
        <LocalSearch
          placeholder={`Search for a question with "${tagOnQuestions.tag.name.toUpperCase()}" tag`}
        />
      </div>

      <div className="flex flex-col gap-5">
        {tagOnQuestions.questions.map((question) => {
          return (
            <QuestionCard
              key={question.question.id}
              question={question.question}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TagIdPage;
