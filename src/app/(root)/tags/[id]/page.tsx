"use client";

import { LocalSearch } from "@/components/local-search";
import QuestionTagList from "../_components/question-tag-list";
import { useQuery } from "@tanstack/react-query";
import { Tag } from "@prisma/client";
import { API_REQUEST_PREFIX } from "@/constants/fetch-request";
import NoResult from "@/components/no-result";

interface PageProps {
  params: {
    id: string;
  };
}

const TagIdPage = ({ params }: PageProps) => {
  const {
    data: tag,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["tag", params.id],
    queryFn: async () => {
      const res = await fetch(`${API_REQUEST_PREFIX}/tags/${params.id}`);
      const data = await res.json();

      return data.data as Tag;
    },
  });

  if (isLoading || isFetching)
    return (
      <div className="animate-pulse">
        <div className="mb-4 h-12 w-32 rounded-lg bg-zinc-200 dark:bg-zinc-900"></div>
        <div className="mb-8 mt-4 h-10 w-full rounded-full bg-zinc-200 dark:bg-zinc-900 lg:w-3/5"></div>
      </div>
    );

  if (!tag)
    return (
      <NoResult
        title="There's no tag found!"
        description="Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. our query could be the next big thing others learn from. Get involved! 💡"
        link="/ask-question"
        linkTitle="Ask a Question"
      />
    );

  return (
    <div>
      <h2 className="inline-block rounded-lg text-2xl font-bold text-primary">
        <span className="text-black dark:text-white">Tag:</span>{" "}
        <span className="rounded-lg bg-zinc-200 px-4 py-1 dark:bg-zinc-900">
          {" "}
          {tag.name}
        </span>
      </h2>

      <div className="mb-8 mt-4 lg:w-3/5">
        <LocalSearch
          placeholder={`Search for a question with "${tag.name?.toUpperCase()}" tag`}
        />
      </div>

      <QuestionTagList tagId={params.id} />
    </div>
  );
};

export default TagIdPage;
