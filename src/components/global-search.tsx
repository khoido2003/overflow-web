import { Search } from "lucide-react";
import { Input } from "./ui/input";

export const GlobalSearch = () => {
  return (
    <div className="relative hidden w-full max-w-[600px] sm:block">
      <Input
        placeholder="Search anything..."
        className="min-h-[45px] rounded-lg"
      />

      <Search className="absolute right-2 top-[10px] h-6 w-6 text-zinc-400" />
    </div>
  );
};
