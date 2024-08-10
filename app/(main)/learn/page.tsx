import React from "react";
import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { TrendingList } from "@/components/trending-list";

const LearnPage = () => {
  return (
    <div className="flex flex-row gap-[48px] px-6">
      <FeedWrapper>g</FeedWrapper>
      <StickyWrapper>
        {/* Right Column */}
        <>
          <h2 className="mb-4 text-xl font-bold text-black text-center">
            Módulos
          </h2>
          <TrendingList />
        </>
      </StickyWrapper>
    </div>
  );
};

export default LearnPage;
