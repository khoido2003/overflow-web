import { ModeToggle } from "@/components/toggle-mode";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="dark:bg-auth-dark bg-auth-light h-full bg-opacity-15 bg-cover bg-center bg-no-repeat">
      <div className="fixed right-4 top-4">
        {" "}
        <ModeToggle />
      </div>

      {children}
    </div>
  );
};
export default Layout;
