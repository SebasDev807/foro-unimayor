import { Sidebar } from "@/components/sidebar";
import { MobileHeader } from "@/components/mobile-header";

type Props = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: Props) => {
  return (
    <>
      <MobileHeader />
      <Sidebar className="hidden lg:flex" />
      <main className="h-full lg:ml-[256px]">
        <div className="max-w-[1056px] mx-auto pt-6 h-full">{children}</div>
      </main>
    </>
  );
};

export default MainLayout;
