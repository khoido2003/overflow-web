"use client";

import { Suspense } from "react";
import { Navbar } from "@/components/navbar";
import { LeftSidebar } from "@/components/left-sidebar";
import { RightSidebar } from "@/components/right-sidebar";
import { QueryProvider } from "@/context/query-provider";
import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";
import { isRightNavHidden } from "@/lib/utils";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const pathname = usePathname();

  return (
    <QueryProvider>
      <SessionProvider>
        <main className="relative m-auto">
          <Suspense fallback={<div>Loading...</div>}>
            <Navbar />
          </Suspense>

          <div className="flex">
            <Suspense fallback={<div>Loading...</div>}>
              <LeftSidebar />
            </Suspense>

            <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-36 font-inter sm:px-14">
              <div className="mx-auto w-full max-w-7xl">
                <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
              </div>
            </section>

            {!isRightNavHidden(pathname) && (
              <Suspense fallback={<div>Loading...</div>}>
                <RightSidebar />
              </Suspense>
            )}
          </div>
        </main>
      </SessionProvider>
    </QueryProvider>
  );
};

export default Layout;
