"use client";

import { filterBarHomepage } from "@/constants";
import { Button } from "./ui/button";

import qs from "query-string";
import { useRouter } from "next/navigation";

interface FilterBarProps {}

export const FilterBar = ({}: FilterBarProps) => {
  const router = useRouter();

  const handleFilterClick = (value: string) => {
    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query: {
          filter: value,
        },
      },
      {
        skipNull: true,
        skipEmptyString: true,
      },
    );

    router.push(url);
  };

  return (
    <div className="mt-5 hidden gap-3 md:flex">
      {/* Only show in large screen device and hide in small screen device */}

      {filterBarHomepage.map((item) => {
        return (
          <Button
            onClick={() => handleFilterClick(item.value)}
            key={item.value}
            variant="outline"
            className="rounded-xl bg-zinc-100 dark:bg-zinc-900"
          >
            {item.value}
          </Button>
        );
      })}
    </div>
  );
};
