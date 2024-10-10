import Link from "next/link";
import Image from "next/image";
import { ClerkLoading, ClerkLoaded, UserButton } from "@clerk/nextjs";
import { Loader } from "lucide-react";
import { cn } from "@/lib/utils";
import { SidebarItem } from "@/components/sidebar-item";

type Props = {
  className?: string;
};

export const Sidebar = ({ className }: Props) => {
  return (
    <div
      className={cn(
        "flex h-full lg:w-[256px] lg:fixed left-0 top-0 px-4 border-r-2 flex-col",
        className
      )}
    >
      <Link href="/learn">
        <div className="pt-8 pl-4 pb-7 flex items-center gap-3">
          <Image
            src="/logo-black-white.svg"
            height={40}
            width={40}
            alt="Logo"
          />
          <h1 className="text-2xl font-extrabold text-foreground tracking-wide">
            FUM
          </h1>
        </div>
      </Link>
      <div className="flex flex-col gap-y-2 flex-1">
        <SidebarItem label="Learn" href="/learn" iconSrc="/home.svg" />
        <SidebarItem
          label="Notifications"
          href="/notifications"
          iconSrc="/bell.svg"
        />
        <SidebarItem
          label="Leaderboard"
          href="/leaderboard"
          iconSrc="/leaderboard.svg"
        />
        <SidebarItem
          label="Profile"
          href="/user-profile"
          iconSrc="/person.svg"
        />
      </div>
      <div className="p-4">
        <ClerkLoading>
          <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
        </ClerkLoading>
        <ClerkLoaded>
          <UserButton afterSignOutUrl="/" />
        </ClerkLoaded>
      </div>
    </div>
  );
};
