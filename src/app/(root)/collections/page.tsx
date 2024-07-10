import { LocalSearch } from "@/components/local-search";
import { BookmarkedQuestionList } from "./_components/bookmarked-questions-list";
import { FilterBarMobile } from "@/components/filter-bar-mobile";
import { filterCollections } from "@/constants";

const Page = () => {
  return (
    <div className="flex w-full flex-col gap-7">
      <h1 className="text-2xl font-bold">Saved Questions</h1>
      <div className="flex w-full gap-2 lg:w-3/5">
        <LocalSearch placeholder="Search your bookmarked question....." />
        <div>
          <FilterBarMobile filters={filterCollections} />
        </div>
      </div>
      <BookmarkedQuestionList />
    </div>
  );
};

export default Page;
