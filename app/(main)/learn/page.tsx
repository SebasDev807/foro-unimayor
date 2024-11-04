import { redirect } from "next/navigation";
import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { TrendingList } from "@/components/trending-list";
import { getPosts, getAuthUser } from "@/prisma/queries";
import CreatePost from "./create-post";
import { Post } from "@/components/post";

const LearnPage = async () => {
  const [user, posts] = await Promise.all([getAuthUser(), getPosts()]);

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="flex flex-row gap-[48px] px-6">
      <FeedWrapper>
        <CreatePost
          // TODO: remove hard-coded values
          image={user.image || "image test"}
          name={user.name || "test name"}
        />
        <div className="w-auto h-auto px-auto space-y-4">
          {posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      </FeedWrapper>
      <StickyWrapper>
        <TrendingList />
      </StickyWrapper>
    </div>
  );
};

export default LearnPage;
