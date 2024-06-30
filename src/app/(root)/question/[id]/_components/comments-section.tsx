"use client";

import qs from "query-string";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { filterCommentsSection } from "@/constants";
import { UserAnswerQuestion } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";
import { CommentsList } from "./comments-list";
import { CommentEditor } from "./comment-editor";

interface CommentsSectionProps {
  comments: UserAnswerQuestion[];
}

export const CommentsSection = ({ comments }: CommentsSectionProps) => {
  // Manipulate the url when choosing the filter
  const router = useRouter();
  const searchParams = useSearchParams();
  const paramsFilter = searchParams.get("filter");

  const handleFilterClick = (value: string) => {
    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query: {
          filter: value,
        },
      },
      {
        skipNull: true,
        skipEmptyString: true,
      },
    );

    router.push(url, { scroll: false });
  };

  return (
    <div className="mt-4 flex flex-col justify-center gap-5">
      {/* Action bar */}
      <div className="flex flex-wrap items-center justify-between">
        <p className="text-xl font-semibold text-primary">
          {comments.length} Answers
        </p>

        <div className="block">
          <Select
            onValueChange={handleFilterClick}
            defaultValue={paramsFilter || undefined}
          >
            <SelectTrigger>
              <div className="line-clamp-1 text-left">
                <SelectValue placeholder="Select a value"></SelectValue>
              </div>
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                {filterCommentsSection.map((filter) => {
                  return (
                    <SelectItem
                      className="cursor-pointer"
                      value={filter.value}
                      key={filter.name}
                    >
                      {filter.name}
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Comments List */}
      <CommentsList comments={comments} />

      {/* Comment editor */}
      <CommentEditor />
    </div>
  );
};
