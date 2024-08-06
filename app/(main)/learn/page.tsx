import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper";

const LearnPage = () => {
  return (
    <div className="flex flex-row gap-[48px] px-6 ">
      <FeedWrapper>
        <div className="w-auto h-auto px-auto">Questions Container</div>
      </FeedWrapper>
      <StickyWrapper>StickyWrapper</StickyWrapper>
    </div>
  );
};

export default LearnPage;
