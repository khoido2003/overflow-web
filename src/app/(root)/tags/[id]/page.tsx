"use client";

import { useQuery } from "@tanstack/react-query";

import { TagOnQuestion } from "@/types/tag";
import { API_REQUEST_PREFIX } from "@/constants/fetch-request";

import { QuestionLoading } from "@/components/loading/question-loading";
import { QuestionCard } from "@/components/question-card";
import NoResult from "@/components/no-result";

interface PageProps {
  params: {
    id: string;
  };
}

const TagIdPage = ({ params }: PageProps) => {
  const {
    data: tagOnQuestions,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["tag", params.id],
    queryFn: async () => {
      const res = await fetch(`${API_REQUEST_PREFIX}/tags/${params.id}`);
      const data = await res.json();

      return data.data as TagOnQuestion;
    },
  });

  if (isLoading || isFetching)
    return (
      <div className="animate-pulse">
        <div className="mb-8 h-12 w-32 rounded-lg bg-gray-200 dark:bg-gray-500"></div>
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
      <h2 className="mb-8 inline-block rounded-lg bg-zinc-200 px-6 py-3 text-2xl font-bold text-primary dark:bg-zinc-800">
        {tagOnQuestions.tag.name}
      </h2>

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
