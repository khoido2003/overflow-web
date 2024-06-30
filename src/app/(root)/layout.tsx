"use client";

import { Navbar } from "@/components/navbar";
import { LeftSidebar } from "@/components/left-sidebar";
import { RightSidebar } from "@/components/right-sidebar";
import { QueryProvider } from "@/context/query-provider";
import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const pathname = usePathname();
<<<<<<< HEAD
=======

>>>>>>> 5a0645136059841ba5693bf6856f1719c03e85db
  return (
    <QueryProvider>
      <SessionProvider>
        <main className="relative m-auto">
          <Navbar />

          <div className="flex">
            <LeftSidebar />

            <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-36 font-inter sm:px-14">
              <div className="mx-auto w-full max-w-7xl">{children}</div>
            </section>

            {!pathname.startsWith("/profile") && <RightSidebar />}
          </div>
        </main>
      </SessionProvider>
    </QueryProvider>
  );
};

export default Layout;
