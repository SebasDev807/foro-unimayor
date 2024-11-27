import { getAuthUser, getUserInfo } from "@/prisma/queries";
import { redirect } from "next/navigation";

import { FollowBar } from "@/components/follow/follow-bar";
import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { Post } from "@/components/post";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Header } from "./header";
import { Info } from "./info";
import { Comment } from "../comments/comment";
import { Cart } from "@/components/follow/card";

const ProfilePage = async () => {
  const [user, info] = await Promise.all([getAuthUser(), getUserInfo()]);

  const { posts, likedPosts, comments, followings, followers } = info;

  if (!user) {
    redirect("/");
  }

  return (
    <div className="flex flex-row h-full max-w-[1024px] gap-2 px-2">
      <FeedWrapper>
        <Header />
        <Info
          name={user.name}
          bio={user.bio}
          image={user.image}
          coverImage={user.coverImage}
          username={user.username}
          following={followings}
          followers={followers}
        />

        <Tabs defaultValue="all">
          <TabsList className="grid w-full grid-cols-4 mb-4">
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="likes">Likes</TabsTrigger>
            <TabsTrigger value="comentarios">Comentarios</TabsTrigger>
            <TabsTrigger value="seguidores">Seguidores</TabsTrigger>
          </TabsList>
          <TabsContent value="posts">
            <div className="w-auto h-auto px-auto space-y-4">
              {posts.map((post) => (
                <Post key={post.id} post={post} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="likes">
            <div className="w-auto h-auto px-auto space-y-4">
              {likedPosts.map((post) => (
                <Post key={post.id} post={post} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="comentarios">
            <div className="w-auto h-auto px-auto space-y-4">
              {comments.map((comment) => (
                // <Post key={post.id} post={post} />
                <Comment key={comment.id} comment={comment} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="seguidores">
            <div className="w-auto h-auto px-auto space-y-4">
              {followings.map((followings) => (
                // <Post key={post.id} post={post} />
                <Cart
                  key={followings.id}
                  user={followings}
                  currentUser={user}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </FeedWrapper>
      <StickyWrapper>
        <FollowBar />
      </StickyWrapper>
    </div>
  );
};

export default ProfilePage;
