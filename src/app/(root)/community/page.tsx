"use client";

import { filterBarCommunity } from "@/constants";

import SearchWithFilter from "@/components/search-with-filter";
import UserGroup from "./_components/user-group";

const CommunityPage = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold">All Users</h1>

      <div className="my-5">
        <SearchWithFilter
          placeholder="Search by username..."
          filterOptions={filterBarCommunity}
        />
      </div>

      <UserGroup />
    </div>
  );
};

export default CommunityPage;
