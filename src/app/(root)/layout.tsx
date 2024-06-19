interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <main className="text-white">
      <div>Navbar</div>

      <div className="flex">
        <div>Leftside bar</div>

        <section>main</section>

        <div>RightSidebar</div>
      </div>
    </main>
  );
};
