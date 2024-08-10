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
export const geAlltUsers = cache(async () => {
  // Fetch all users
  const users = await client.user.findMany();

  return users;
});
