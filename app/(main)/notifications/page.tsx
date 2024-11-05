import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { TrendingList } from "@/components/trending-list";
import { Notifications } from "./notification";

import { getNotifications } from "@/prisma/queries";

export default async function NotificationsPage() {
  const [notifications] = await Promise.all([getNotifications()]);

  return (
    <div className="flex flex-row gap-[48px] px-6">
      <FeedWrapper>
        <Notifications notifications={notifications} />
      </FeedWrapper>
      <StickyWrapper>
        <TrendingList />
      </StickyWrapper>
    </div>
  );
}
