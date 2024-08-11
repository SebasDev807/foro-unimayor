import { getPosts, getAuthUser } from "@/prisma/queries";

import { FollowBar } from "@/components/follow-bar";
import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { Header } from "./header";
import { Info } from "./user-profile";

const ProfilePage = async () => {
  const [posts, user] = await Promise.all([getPosts(), getAuthUser()]);

  if (!user) {
    return <div>Error: User not found</div>;
  }

  return (
    <div className="flex flex-row gap-[48px] px-6">
      <FeedWrapper>
        {/* TODO: header is client side, how it could work? */}
        {/* <Header /> */}
        <Info
          name={user.name}
          bio={user.bio}
          image={user.image}
          coverImage={user.coverImage}
        />
        <div className="w-auto h-auto px-auto">
          {posts.map((post) => (
            <div key={post.id} className="mb-10 bg-slate-500">
              {JSON.stringify(post)}
              {/* <Post
                id={post.id}
                // order={post.order}
                // description={post.description}
                title={post.title}
                lessons={post.lessons}
                activeLesson={
                  courseProgress.activeLesson as
                    | (SelectLessons & {
                        post: SelectUnits;
                      })
                    | undefined
                }
                activeLessonPorcentage={lessonPercentage}
              /> */}
            </div>
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
