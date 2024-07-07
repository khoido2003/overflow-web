import { useSearchParams } from "next/navigation";

interface UseSearchOptionsProps {
  defaultPageSize?: number;
}

export const useSearchParamsOptions = ({
  defaultPageSize = 10,
}: UseSearchOptionsProps = {}) => {
  const searchParams = useSearchParams();

  // SEARCH OPTIONS
  const searchQuery = searchParams.get("q") || "";

  // QUERY OPTIONS
  const filter = searchParams.get("filter") || "";

  // PAGINATION
  // const pageParams = searchParams.get("page") || 1;

  // const pageSize = searchParams.get("pageSize") || defaultPageSize || 10;

  const pageParams = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = parseInt(
    searchParams.get("pageSize") || defaultPageSize.toString(),
    10,
  );

  return {
    searchParams,
    searchQuery,
    filter,
    pageParams,
    pageSize,
  };
};
