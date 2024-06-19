import Image from "next/image";
import Link from "next/link";
import { ModeToggle } from "./toggle-mode";
import { GlobalSearch } from "./global-search";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 z-50 m-auto flex w-full max-w-screen-2xl items-center justify-between gap-7 bg-zinc-100 p-6 shadow-inner dark:bg-zinc-900 dark:shadow-none sm:px-12">
      <Link href="/" className="flex items-center justify-center gap-2">
        <Image src="/assets/logo.svg" width={23} height={23} alt="OverFlow" />

        <p className="font-spaceGrotesk text-2xl font-extrabold text-black dark:text-white">
          {" "}
          Code<span className="text-primary">Overflow</span>
        </p>
      </Link>

      <GlobalSearch />

      <div className="flex">
        <ModeToggle />
      </div>
    </nav>
  );
};
