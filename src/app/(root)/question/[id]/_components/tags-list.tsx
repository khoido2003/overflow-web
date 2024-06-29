import { Tag } from "@prisma/client";

interface TagListProps {
  tags: {
    tag: Tag;
  }[];
}

export const TagsList = ({ tags }: TagListProps) => {
  return (
    <div className="flex items-center gap-3">
      {tags.map((tag) => {
        return (
          <div
            key={tag.tag.id}
            className="rounded-lg bg-zinc-200 px-4 py-2 text-[#467FC8] shadow-md dark:bg-zinc-800"
          >
            {tag.tag.name}
          </div>
        );
      })}
    </div>
  );
};
