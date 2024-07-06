"use client";

import { JOB_API_KEY, JOB_API_URL } from "@/constants/fetch-request";
import { useQuery } from "@tanstack/react-query";
import { encodeBase64 } from "bcryptjs";
import { useState } from "react";

const JobList = () => {
  const [totalJob, setTotalJob] = useState<number>(0);

  const auth = Buffer.from("94fe6c59-5354-4157-9e1e-371b7d967f9b").toString(
    "base64",
  );

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["jobs"],
    queryFn: async () => {
      console.log("first");
      const res = await fetch(
        "https://www.reed.co.uk/api/1.0/search?keywords=developer",
        {
          mode: "no-cors",
          method: "GET",
          credentials: "include",
          headers: {
            "Access-Control-Allow-Origin": "*",
            Authorization: `Basic OTRmZTZjNTktNTM1NC00MTU3LTllMWUtMzcxYjdkOTY3ZjliOg==`,
          },
        },
      );

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      console.log(res);

      console.log("second");
      const data = await res.json();
      setTotalJob(data.totalResults);
      return data.results;
    },
  });

  if (isLoading || isFetching) return <div>Loading...</div>;

  return <div>JobList</div>;
};

export default JobList;
