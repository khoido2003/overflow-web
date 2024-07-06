"use client";

import { filterBarHomepage } from "@/constants";
import { Button } from "./ui/button";

import qs from "query-string";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

interface FilterBarProps {}

export const FilterBar = ({}: FilterBarProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const filter = searchParams.get("filter");

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
            className={cn(
              "rounded-xl bg-zinc-100 dark:bg-zinc-900",

              filter === item.value &&
                "bg-zinc-500 text-white dark:bg-zinc-300 dark:text-black",
            )}
          >
            {item.value}
          </Button>
        );
      })}
    </div>
  );
};
