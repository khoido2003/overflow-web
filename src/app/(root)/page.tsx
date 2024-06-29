import Link from "next/link";

import { FilterBar } from "@/components/filter-bar";
import { FilterBarMobile } from "@/components/filter-bar-mobile";
import { LocalSearch } from "@/components/local-search";
import { buttonVariants } from "@/components/ui/button";
import { CircleHelp } from "lucide-react";

import { filterBarHomepage } from "@/constants";
import { Metadata } from "next";
import { Feed } from "@/components/feed";

export const metadata: Metadata = {
  title: "Home | Code Overflow",
};
interface SearchParamsProps {
  searchParams: {
    [key: string]: string | undefined;
  };
}

// NOTE: If the searchParams is changed then the component will be re-rendered on the server since this is a server side component
const Page = async ({ searchParams }: SearchParamsProps) => {
  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-2xl font-extrabold">All Questions</h1>

        {/*redirect to page ask new question */}
        <Link
          href="/ask-question"
          className={buttonVariants({
            className: "",
          })}
        >
          Ask a Question <CircleHelp className="ml-1 h-4 w-4" />
        </Link>
      </div>

      <div className="mt-6 flex w-full justify-between gap-2 sm:items-center md:flex-col">
        {/* Searchbar to search questions - Manipulate the searchParams on the URL with the input to tell this page re-render and fetch new data */}
        <LocalSearch placeholder="Search for questions" />

        {/* Filter question in mobile/small screen: newest, recommended, frequent, unanswered */}
        <FilterBarMobile filters={filterBarHomepage} />
      </div>

      {/* Filter question in desktop/large screen: newest, recommended, frequent, unanswered  */}
      <FilterBar />

      {/* Main content/ Feed */}
      <div className="mt-6">
        <Feed />
      </div>
    </>
  );
};

export default Page;
