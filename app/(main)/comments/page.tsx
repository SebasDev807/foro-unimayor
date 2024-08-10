import React from "react";
import Modules from "@/components/trending-list";
import Comments from "@/components/comments";

const CommentsPage = () => {
  return (
    <div className="flex flex-row gap-[48px] px-6">
      <div className="w-3/4">
        <Comments />
      </div>
      {/* Right Column */}
      <div className="w-1/4">
        <div className="sticky top-4">
          <Modules />
        </div>
      </div>
    </div>
  );
};

export default CommentsPage;
