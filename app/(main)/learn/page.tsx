
import React from 'react';
import  FeedWrapper  from '@/components/feed-wrapper';
import Modules from '@/components/modules';

const LearnPage = () => {
  return (
    <div className="flex flex-row gap-[48px] px-6">
      <FeedWrapper>
      </FeedWrapper>

      {/* Right Column */}
      <div className="w-1/4">
        <div className="sticky top-4">
          <Modules />
        </div>
      </div>
    </div>
  );
};

export default LearnPage;
