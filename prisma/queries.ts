import client from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";

import { cache } from "react";

export const getUser = cache(async () => {
  const { userId } = auth();
  console.log(userId);

  if (!userId) return null;

  // Fetch user details using authUserId
  const user = await client.user.findUnique({
    where: {
      authUserId: userId,
    },
  });

  return user;
});
