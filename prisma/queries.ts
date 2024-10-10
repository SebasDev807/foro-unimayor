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
  const posts = await client.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 10, // Limita la consulta a 10 posts
  });

  return posts;
});
