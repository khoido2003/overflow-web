"use client";

import { DEFAULT_JOB_PAGE_SIZE, JOB_API_URL } from "@/constants/fetch-request";
import { Job } from "@/types/jobs";
import { useQuery } from "@tanstack/react-query";
import JobItem from "./job-item";
import { useEffect, useState } from "react";
import PaginationBar from "@/components/pagination-bar";
import JobItemSkeleton from "./job-item-skeleton";

const JobList = () => {
  const [currPage, setCurrPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [jobsPaginate, setJobsPaginate] = useState<Job[]>([]);

  const {
    data: jobs,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["jobs"],
    queryFn: async () => {
      const res = await fetch(JOB_API_URL);

      const data = await res.json();

      setTotalPages(Math.ceil(+data.jobCount / DEFAULT_JOB_PAGE_SIZE));

      return data.jobs as Job[];
    },
  });

  useEffect(() => {
    // Scroll to top when change page
    window.scrollTo({ top: 0 });

    const skip = (currPage - 1) * DEFAULT_JOB_PAGE_SIZE;
    if (jobs) setJobsPaginate(jobs.slice(skip, skip + DEFAULT_JOB_PAGE_SIZE));
  }, [currPage, jobs]);

  if (isLoading || isFetching || !jobs || jobsPaginate.length === 0)
    return (
      <div className="flex flex-col gap-8">
        <JobItemSkeleton />
        <JobItemSkeleton />
        <JobItemSkeleton />
        <JobItemSkeleton />
        <JobItemSkeleton />
      </div>
    );

  const handleNextPage = () => {
    setCurrPage((prev) => prev + 1);
  };
  const handlePrevPage = () => {
    setCurrPage((prev) => prev - 1);
  };
  const handleSetPage = (page: number) => {
    setCurrPage(page);
  };

  return (
    <>
      <div className="flex flex-col gap-8">
        {jobsPaginate.map((job) => (
          <JobItem key={job.id} job={job} />
        ))}
      </div>

      <div className="my-5 md:my-10">
        <PaginationBar
          totalPage={totalPages}
          currPage={currPage}
          handleNextPage={handleNextPage}
          handlePrevPage={handlePrevPage}
          handleSetPage={handleSetPage}
        />
      </div>
    </>
  );
};

export default JobList;
