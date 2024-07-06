import TagCard from "@/components/tag-card";
import { Tag } from "@prisma/client";

interface TagListProps {
  tags: {
    tag: Tag;
  }[];
}

export const TagsList = ({ tags }: TagListProps) => {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {tags.map((tag) => {
        return <TagCard key={tag.tag.id} tag={tag.tag} />;
      })}
    </div>
  );
};
