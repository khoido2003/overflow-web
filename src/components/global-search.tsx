"use client";

import { CalendarIcon, RocketIcon, Search } from "lucide-react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "./ui/command";
import { FaceIcon } from "@radix-ui/react-icons";

export const GlobalSearch = () => {
  return (
    <Command className="relative hidden w-full max-w-[600px] overflow-visible sm:block">
      <CommandInput
        placeholder="Search anything..."
        className="min-h-[45px] rounded-lg"
      />

      <CommandList className="absolute inset-x-0 top-[110%] z-50 bg-white shadow-md dark:bg-[#0C0A09] dark:shadow-none">
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>
            <CalendarIcon className="mr-2 h-4 w-4" />
            <span>Calendar</span>
          </CommandItem>
          <CommandItem>
            <FaceIcon className="mr-2 h-4 w-4" />
            <span>Search Emoji</span>
          </CommandItem>
          <CommandItem>
            <RocketIcon className="mr-2 h-4 w-4" />
            <span>Launch</span>
          </CommandItem>

          <CommandItem>
            <RocketIcon className="mr-2 h-4 w-4" />
            <span>Khoi</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
      </CommandList>
    </Command>
  );
};
