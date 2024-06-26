import { buttonVariants } from "@/components/ui/button";
import { CircleHelp } from "lucide-react";
import Link from "next/link";

const Page = () => {
  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-2xl font-extrabold">All Questions</h1>

        <Link
          href="/ask-question"
          className={buttonVariants({
            className: "",
          })}
        >
          Ask a Question <CircleHelp className="ml-1 h-4 w-4" />
        </Link>
      </div>

      <div className=""></div>
    </>
  );
};

export default Page;
