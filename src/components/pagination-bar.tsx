import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

interface PaginationBarProps {
  currPage: number;
  totalPage: number;

  handleNextPage: () => void;
  handlePrevPage: () => void;
  handleSetPage: (newPage: number) => void;
}

function createPaginationArray(page: number): number[] {
  return [page - 1, page, page + 1];
}

const PaginationBar = ({
  currPage,
  totalPage,
  handleNextPage,
  handlePrevPage,
  handleSetPage,
}: PaginationBarProps) => {
  return (
    <Pagination>
      <PaginationContent className="rounded-lg bg-zinc-100 px-4 py-2 dark:bg-zinc-900">
        <PaginationItem>
          <PaginationPrevious
            className={cn(
              "cursor-pointer",
              currPage === 1 && "pointer-events-none hidden",
            )}
            onClick={handlePrevPage}
          />
        </PaginationItem>

        {currPage > 2 && (
          <PaginationItem>
            <PaginationLink
              className={cn("cursor-pointer")}
              onClick={() => handleSetPage(currPage - 2)}
            >
              <PaginationEllipsis />
            </PaginationLink>
          </PaginationItem>
        )}

        {createPaginationArray(currPage).map((value) => {
          return (
            <PaginationItem
              key={value}
              className={cn(
                "cursor-pointer",
                value === 0 && "pointer-events-none hidden",
                value === totalPage + 1 && "pointer-events-none hidden",
              )}
            >
              <PaginationLink
                isActive={currPage === value}
                onClick={() => handleSetPage(value)}
              >
                {value}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        {currPage <= totalPage - 2 && (
          <PaginationItem>
            <PaginationLink
              className={cn("cursor-pointer")}
              onClick={() => handleSetPage(currPage + 2)}
            >
              <PaginationEllipsis />
            </PaginationLink>
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationNext
            className={cn(
              "cursor-pointer",
              currPage === totalPage && "pointer-events-none hidden",
            )}
            onClick={handleNextPage}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationBar;
