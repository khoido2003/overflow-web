import React from "react";
import JobList from "./_components/job-list";

const Jobs = () => {
  return (
    <section>
      <h1 className="text-3xl font-bold">Jobs</h1>

      <div className="my-5">
        {/* <SearchWithFilter
          placeholder="Search by username..."
          filterOptions={filterBarCommunity}
        /> */}
      </div>

      <JobList />
    </section>
  );
};

export default Jobs;
