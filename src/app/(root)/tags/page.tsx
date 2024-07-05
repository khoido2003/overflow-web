import SearchWithFilter from "@/components/search-with-filter";
import { filterBarTag } from "@/constants";
import React from "react";
import TagFeed from "./_components/tag-feed";

const TagPage = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold">All Tags</h1>

      <div className="my-6">
        <SearchWithFilter
          placeholder="Search by tag name"
          filterOptions={filterBarTag}
        />
      </div>

      <TagFeed />
    </div>
  );
};

export default TagPage;
