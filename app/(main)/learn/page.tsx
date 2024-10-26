import { redirect } from "next/navigation";
import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { TrendingList } from "@/components/trending-list";
import { PostList } from "./post-list"; // Ensure this import is correct
import { getPosts, getAuthUser } from "@/prisma/queries";
import CreatePost from "./create-post";

const LearnPage = async () => {
  const [user, posts] = await Promise.all([getAuthUser(), getPosts()]);

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="flex flex-row gap-[48px] px-6">
      <FeedWrapper>
        <CreatePost
          image={user.image || "image test"}
          name={user.name || "test name"}
        />
        <div className="w-auto h-auto px-auto">
          <PostList initialPosts={posts} />
        </div>
      </FeedWrapper>
      <StickyWrapper>
        <TrendingList />
      </StickyWrapper>
    </div>
  );
};

export default LearnPage;
