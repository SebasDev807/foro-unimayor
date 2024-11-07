"use client";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export const Header = () => {
  const router = useRouter();

  return (
    <div className="sticky top-0 bg-white pb-2 lg:pt-[28px] lg:mt-[-28px] flex items-center justify-between border-b-2 mb-5 text-neutral-400 lg:z-50">
      <Button variant="ghost" size="sm" onClick={() => router.back()}>
        <ArrowLeft className="h-5 w-5 stroke-2 text-neutral-400" />
      </Button>
      <h1 className="text-sm font-bold">User Profile</h1>
      {/* Empty div for spacing */}
      <div />
    </div>
  );
};
