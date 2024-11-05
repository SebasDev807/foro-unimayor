import client from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
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
  const { userId } = auth();
  if (!userId) {
    throw new Error("User ID is null");
  }

  // Fetch posts in descending order, including comments and user details
  const posts = await client.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 10,
    include: {
      comments: true,
      user: true,
    },
  });

  // Normalize the posts by adding stats
  const normalizedPosts = posts.map((post) => ({
    ...post,
    stats: {
      likes: {
        length: post.likedIds.length,
        isLiked: post.likedIds.includes(userId), // <- Este campo se calcula en el servidor
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

export const getNotifications = cache(async () => {
  // Obtains the authenticated user ID
  const { userId } = auth();
  if (!userId) {
    throw new Error("User ID is null");
  }

  const notifications = await client.notification.findMany({
    where: {
      authUserId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 10,
    include: {
      user: true,
    },
  });

  return notifications;
});
