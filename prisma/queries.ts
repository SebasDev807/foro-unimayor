import client from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { Category } from "@prisma/client";
import { cache } from "react";

/**
 * Retrieves the user details based on the authenticated user ID.
 */
export const getAuthUser = cache(async () => {
  const { userId } = auth();
  if (!userId) return null;

  // Fetch user details using authUserId
  const user = await client.user.findUnique({
    where: {
      authUserId: userId,
    },
  });

  return user;
});

/**
 * Retrieves the user details based on the authenticated user ID.
 */
export const getAllUsers = cache(async () => {
  // Fetch all users
  const users = await client.user.findMany();

  return users;
});

/**
 * Retrieves the user details based on the authenticated user ID.
 */
export const getUserDetails = cache(async () => {
  const user = await getAuthUser();
  if (!user) return null;

  const followerCount = await client.user.count({
    where: {
      followingIds: {
        has: user.id,
      },
    },
  });

  return {
    ...user,
    followerCount,
  };
});

/**
 * Retrieves at random post
 */
export const getPosts = cache(async () => {
  // Fetch posts in descending order, including comments
  const posts = await client.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 10, // Limita la consulta a 10 posts
    include: {
      comments: true, // Incluir comentarios asociados
    },
  });

  // Normalize data to include post stats
  const normalizedPosts = posts.map((post) => ({
    ...post,
    stats: {
      likes: {
        length: post.likedIds.length,
        isLiked: post.likedIds.includes(post.authUserId),
      },
      comments: post.comments.length,
    },
  }));

  return normalizedPosts;
});

/**
 * Retrieves at random post
 */
export const getCommentsPost = cache(async (postId: string) => {
  const posts = await client.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 10, // Limita la consulta a 10 posts
  });

  const comments = await client.comment.findMany({
    where: {
      postId: postId,
    },
  });

  return posts;
});

export const getUsersRankedByLikes = cache(async () => {
  const users = await client.user.findMany({
    select: {
      authUserId: true,
      name: true,
      username: true,
      profileImage: true,
      comments: {
        select: {
          likedIds: true,
        },
      },
    },
  });

  const rankedUsers = users
    .map((user) => ({
      ...user,
      totalLikes: user.comments.reduce(
        (sum, comment) => sum + comment.likedIds.length,
        0
      ),
    }))
    .sort((a, b) => b.totalLikes - a.totalLikes)
    .slice(0, 10); // Obtener los 10 usuarios principales

  return rankedUsers;
});
