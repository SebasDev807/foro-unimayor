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
          {/* {posts ? (
            posts.map((post) => (
              <div key={post.id} className="mb-10">
                <Post
                  avatar={user.image ?? ""}
                  username={user.name ?? "david"}
                  handle={"handle"}
                  time={Date.now().toString()}
                  content={"Content Test"}
                  image={user.image ?? ""}
                  category={"Category test"}
                  currentUser={user.name ?? "david"}
                  // onCommentClick={() => {}}
                  // onEditClick={() => {}}
                  // onDeleteClick={() => {}}
                  // onReportClick={() => {}}
                />
              </div>
            ))
          ) : (
            <div className="text-2xl">
              Aun no se han realizado publicaciones, sé el primero en hacerlo
            </div>
          )} */}
        </div>
      </FeedWrapper>
      <StickyWrapper>
        <h2 className="mb-4 text-xl font-bold text-black text-center">
          Módulos
        </h2>
        <TrendingList />
      </StickyWrapper>
    </div>
  );
};

export default LearnPage;
