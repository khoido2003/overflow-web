import { Navbar } from "@/components/navbar";
import { LeftSidebar } from "@/components/left-sidebar";
import { RightSidebar } from "@/components/right-sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <main className="relative m-auto max-w-screen-2xl">
      <Navbar />

      <div className="flex">
        <LeftSidebar />

        <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-36 sm:px-14">
          <div className="mx-auto w-full max-w-5xl">{children}</div>
        </section>

        <RightSidebar />
      </div>
    </main>
  );
};

export default Layout;
