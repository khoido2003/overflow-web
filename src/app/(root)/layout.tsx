import { Navbar } from "@/components/navbar";
import { LeftSidebar } from "@/components/left-sidebar";
import { RightSidebar } from "@/components/right-sidebar";
import { QueryProvider } from "@/components/providers/query-provider";
import { SessionProvider } from "next-auth/react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <QueryProvider>
      <SessionProvider>
        <main className="relative m-auto">
          <Navbar />

          <div className="flex">
            <LeftSidebar />

            <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-36 font-inter sm:px-14">
              <div className="mx-auto w-full max-w-5xl">{children}</div>
            </section>

            <RightSidebar />
          </div>
        </main>
      </SessionProvider>
    </QueryProvider>
  );
};

export default Layout;
