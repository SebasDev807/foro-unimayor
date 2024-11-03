import { getPosts, getAuthUser } from "@/prisma/queries";
import { redirect } from "next/navigation";

import { FollowBar } from "@/components/follow-bar";
import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { Post } from "@/components/post";
// import { Header } from "./header"; // TODO: make it work with client side
import { Info } from "./info";

const ProfilePage = async () => {
  const [posts, user] = await Promise.all([getPosts(), getAuthUser()]);

  if (!user) {
    redirect("/");
  }

  return (
    <div className="flex flex-row h-full max-w-[1024px] gap-2 px-2">
      <FeedWrapper>
        {/* TODO: header is client side, how it could work? */}
        {/* <Header /> */}
        <Info
          name={user.name}
          bio={user.bio}
          image={user.image}
          coverImage={user.coverImage}
          username={user.username}
        />
        <div className="w-auto h-auto px-auto space-y-4">
          {posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      </FeedWrapper>
      <StickyWrapper>
        <FollowBar />
      </StickyWrapper>
    </div>
  );
};

export default ProfilePage;
