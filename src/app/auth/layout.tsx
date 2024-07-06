import { ModeToggle } from "@/components/toggle-mode";
import { Suspense } from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="h-full bg-opacity-15 bg-auth-light bg-cover bg-center bg-no-repeat dark:bg-auth-dark">
      <div className="fixed right-4 top-4">
        {" "}
        <ModeToggle />
      </div>

      <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
    </div>
  );
};
export default Layout;
