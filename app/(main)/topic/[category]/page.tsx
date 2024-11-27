import { redirect } from "next/navigation";
import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { TrendingList } from "@/components/trending-list";
import { getPosts, getAuthUser } from "@/prisma/queries";
import { Post } from "@/components/post";
import { Category } from "@prisma/client";

const categoryMap: { [key: string]: Category } = {
  matematica: Category.MATEMATICA,
  programacion: Category.PROGRAMACION,
  sistemas: Category.SISTEMAS,
};

const categoryDisplayNames: { [key in Category]: string } = {
  [Category.MATEMATICA]: "Matemáticas",
  [Category.PROGRAMACION]: "Programación",
  [Category.SISTEMAS]: "Sistemas",
};

const TopicPage = async ({ params }: { params: { category?: string } }) => {
  if (!params.category) {
    redirect("/404");
  }

  const category = categoryMap[params.category.toLowerCase()];

  if (!category) {
    redirect("/404");
  }

  const [user, posts] = await Promise.all([
    getAuthUser(),
    getPosts({ where: { category } })
  ]);

  if (!user) {
    redirect("/login");
  }

  const categoryTitle = categoryDisplayNames[category];

  return (
    <div className="flex flex-row gap-[48px] px-6">
      <FeedWrapper>
        <h1 className="text-4xl font-bold text-center my-8">{categoryTitle}</h1>
        <div className="w-auto h-auto px-auto space-y-4">
          {posts.map((post) => (
            <Post key={post.id} post={post} currentUserId={user.authUserId} />
          ))}
          {posts.length === 0 && (
            <p className="text-center text-gray-500">No hay posts en esta categoría aún.</p>
          )}
        </div>
      </FeedWrapper>
      <StickyWrapper>
        <TrendingList />
      </StickyWrapper>
    </div>
  );
};

export default TopicPage;

export function generateStaticParams() {
  return Object.keys(categoryMap).map(category => ({
    category,
  }));
}