"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import { getAuthUser } from "@/prisma/queries";

import client from "@/lib/prismadb";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

/**
 * inserts new user into the database
 *
 * @param {number} courseId - The ID of the course.
 * @throws {Error} Throws an error if the user is not authenticated or the course is not found.
 */
export const insertUser = async () => {
  const { userId } = auth();
  const user = await currentUser();

  if (!userId || !user) {
    throw new Error("Unauthorized");
  }

  const existingUser = await getAuthUser();
  // If user exists, don't insert and redirect to the learn page
  if (existingUser) {
    revalidatePath("/courses");
    revalidatePath("/learn");
    redirect("/learn");
  } else {
    await client.user.create({
      data: {
        authUserId: userId,
        username: user.username,
        // bio: ...,
        email: user.emailAddresses[0].emailAddress,
        // TODO: check if is ok to use the email as the emailVerified date
        emailVerified: user.emailAddresses[0].emailAddress ? new Date() : null,
        image: user.imageUrl,
        coverImage: user.imageUrl, // TODO
        profileImage: user.imageUrl, // TODO
        // hashedPassword: user.pass
        createdAt: new Date(),
        updatedAt: new Date(),

        hasNewNotifications: false,
      },
    });

    revalidatePath("/");
    revalidatePath("/learn");
    redirect("/learn");
  }
};
