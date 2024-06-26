import { filterBarHomepage } from "@/constants";
import { Button } from "./ui/button";

interface FilterBarProps {}

export const FilterBar = ({}: FilterBarProps) => {
  return (
    <div className="mt-5 hidden gap-3 md:flex">
      {/* Only show in large screen device and hide in small screen device */}

      {filterBarHomepage.map((item) => {
        return (
          <Button
            key={item.value}
            variant="outline"
            className="rounded-xl bg-zinc-900"
          >
            {item.value}
          </Button>
        );
      })}
    </div>
  );
};
