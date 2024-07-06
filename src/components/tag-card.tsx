import Link from "next/link";
import React from "react";
import { Tag } from "@prisma/client";

const TagCard = ({ tag }: { tag: Tag }) => {
  return (
    <Link href={`/tags/${tag.id}`}>
      <div className="inline-block rounded-lg bg-zinc-200 px-4 py-2 text-base text-[#1DA1F2] shadow-sm dark:bg-zinc-800 dark:text-[#7B8EC8]">
        {tag.name}
      </div>
    </Link>
  );
};

export default TagCard;
