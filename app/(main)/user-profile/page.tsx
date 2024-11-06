import { getPosts, getAuthUser } from "@/prisma/queries";
import { redirect } from "next/navigation";

import { FollowBar } from "@/components/follow/follow-bar";
import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { Post } from "@/components/post";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
// import { Header } from "./header"; // TODO: make it work with client side
import { Info } from "./info";

const ProfilePage = async () => {
  const [posts, user] = await Promise.all([getPosts(), getAuthUser()]);

  if (!user) {
    redirect("/");
  }

  // TODO: make his own querys
  const userPosts = posts.filter(
    (post) => post.user.authUserId === user.authUserId
  );

  const likedPosts = posts.filter((post) =>
    post.likedIds.includes(user.authUserId)
  );

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

        <Tabs defaultValue="all">
          <TabsList className="grid w-full grid-cols-4 mb-4">
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="likes">Likes</TabsTrigger>
            <TabsTrigger value="comentarios">Comentarios</TabsTrigger>
            <TabsTrigger value="seguidores">Seguidores</TabsTrigger>
          </TabsList>
          <TabsContent value="posts">
            <div className="w-auto h-auto px-auto space-y-4">
              {userPosts.map((post) => (
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
              {posts.map((post) => (
                <Post key={post.id} post={post} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="seguidores">
            <div className="w-auto h-auto px-auto space-y-4">
              {posts.map((post) => (
                <Post key={post.id} post={post} />
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
