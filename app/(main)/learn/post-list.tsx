"use client";

import { Post } from "@/components/post-refactor";

type Post = {
  id: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
  authUserId: string;
  likedIds: string[];
};

type Props = {
  initialPosts: Post[];
};

export const PostList = ({ initialPosts }: Props) => {
  return (
    <div className="space-y-4">
      {initialPosts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};
