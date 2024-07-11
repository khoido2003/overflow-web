import React from "react";
import JobList from "./_components/job-list";

const Jobs = () => {
  return (
    <section>
      <h1 className="text-3xl font-bold">Jobs</h1>

      <div className="my-5 md:my-10">
        <JobList />
      </div>
    </section>
  );
};

export default Jobs;
