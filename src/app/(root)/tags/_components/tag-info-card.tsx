import { TagInfo } from "@/types/tag";
import Link from "next/link";

const TagInfoCard = ({ tag }: { tag: TagInfo }) => {
  return (
    <Link
      href={`/tags/${tag.id}`}
      className="flex flex-1 flex-col items-start gap-2 rounded-xl bg-zinc-100 px-8 py-6 shadow-md dark:bg-zinc-900 md:gap-5 md:px-10 md:py-8"
    >
      <div className="inline-block rounded-lg bg-zinc-200 px-4 py-2 text-base text-[#1DA1F2] shadow-sm dark:bg-zinc-800 dark:text-[#7B8EC8]">
        {tag.name}
      </div>

      <p className="text-sm text-[#3F4354] dark:text-[#DCE3F1]">
        JavaScript, often abbreviated as JS, is a programming language that is
        one of the core technologies of the World Wide Web, alongside HTML and
        CSS
      </p>

      <p className="flex items-center gap-2">
        <span className="text-xl font-bold text-primary">
          {tag._count.tagOnQuestion}+
        </span>{" "}
        <span className="text-sm font-semibold text-[#212734] dark:text-[#7B8EC8]">
          Questions
        </span>
      </p>
    </Link>
  );
};

export default TagInfoCard;
