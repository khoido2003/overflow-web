import React from "react";
import JobList from "./_components/job-list";
import { LocalSearch } from "@/components/local-search";

const Jobs = () => {
  return (
    <section>
      <h1 className="text-3xl font-bold">Jobs</h1>

      <div className="my-5 md:my-10 md:w-3/5">
        <LocalSearch />
      </div>

      <JobList />
    </section>
  );
};

export default Jobs;
