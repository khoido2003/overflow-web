import { formatAndDivideNumber } from "@/lib/utils";
import { Job } from "@/types/jobs";
import { ArrowUpRight, CircleDollarSign, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const JobItem = ({ job }: { job: Job }) => {
  return (
    <div className="flex gap-6 rounded-lg bg-zinc-100 p-9 dark:bg-zinc-900">
      <Image
        src={job.companyLogo}
        alt={job.companyName}
        width={64}
        height={64}
        className="hidden h-16 w-16 rounded-full sm:block"
        loading="lazy"
      />

      <div className="flex flex-col gap-5">
        <div className="flex flex-col">
          <div className="flex flex-col items-start gap-2 lg:flex-row lg:items-center lg:gap-4">
            <h4 className="text-xl font-bold">{job.jobTitle}</h4>
            <span className="rounded-lg bg-zinc-200 p-2 text-xs uppercase text-[#1DA1F2] dark:bg-zinc-800 dark:text-[#7B8EC8]">
              {job.jobIndustry[0]}
            </span>
          </div>

          <p className="mt-2 line-clamp-2 text-sm">{job.jobExcerpt}</p>
        </div>

        <div className="flex flex-col items-start gap-5 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-2 text-[#1DA1F2] dark:text-[#7B8EC8] md:flex-row md:gap-5">
            <p className="flex items-center gap-2 text-sm uppercase">
              <Clock className="h-4 w-4" />
              {job.jobType[0]}
            </p>

            {job.annualSalaryMin && job.annualSalaryMax && (
              <p className="flex items-center gap-2 text-sm uppercase">
                <CircleDollarSign className="h-4 w-4" />
                {`${formatAndDivideNumber(+job.annualSalaryMin)} - ${formatAndDivideNumber(+job.annualSalaryMax)} ${job.salaryCurrency}`}
              </p>
            )}
          </div>

          <Link
            href={job.url}
            className="flex items-center gap-2 self-end font-semibold text-primary"
            target="_blank"
          >
            View job
            <ArrowUpRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JobItem;
