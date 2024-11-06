"use server";

import { revalidatePath } from "next/cache";
import client from "@/lib/prismadb";
import { auth, currentUser } from "@clerk/nextjs/server";
import { Category, Post } from "@prisma/client";

type CreatePostParams = {
  body: string;
  category: Category;
  image: string | null;
};
// Creates a new post in the database.
export async function createPost({ body, category, image }: CreatePostParams) {
  try {
    const { userId } = auth();
    if (!userId) throw new Error("Unauthorized");

    const post = await client.post.create({
      data: {
        body,
        category: category as Category,
        authUserId: userId,
        image, // La cadena Base64 se guarda en MongoDB
        likedIds: [],
      },
    });

    revalidatePath("/learn");
    return { success: true, data: post };
  } catch (error) {
    console.error("Error creating post:", error);
    return {
      success: false,
      error: "An error occurred while creating the post",
    };
  }
}

// Toggles the like status of a post for the authenticated user.
export async function likePostToggle(post: Post) {
  try {
    // Authenticate the user and retrieve the current user
    const { userId } = auth();
    const user = await currentUser();
    if (!userId || !user) throw new Error("Unauthorized");

    // Check if the post exists in the database
    const existingPost = await client.post.findUnique({
      where: { id: post.id },
    });
    if (!existingPost) return { error: true, message: "Post not found" };

    // Toggle like status for the post by updating the liked IDs
    const hasLike = existingPost.likedIds.includes(userId);
    const updatedLikes = hasLike
      ? existingPost.likedIds.filter((id) => id !== userId)
      : [...existingPost.likedIds, userId];

    // Update the post's liked IDs in the database
    await client.post.update({
      where: { id: post.id },
      data: { likedIds: updatedLikes },
    });
    // Update the notification
    await client.notification.create({
      data: {
        body: `${user.fullName} liked your post`,
        authUserId: userId,
        type: "LIKE",
        read: false,
      },
    });

    revalidatePath("/learn");
    // eslint-disable-next-line brace-style
  } catch (error) {
    // Log and return error if toggle fails
    console.error("Error toggling like status:", error);
    return { error: true, message: "An error occurred" };
  }
}

// Delete notification
export async function deleteNotification(notificationId: string) {
  try {
    // Authenticate the user and retrieve the current user
    const { userId } = auth();
    const user = await currentUser();
    if (!userId || !user) throw new Error("Unauthorized");

    // Check if the notification exists in the database
    const existingNotification = await client.notification.findUnique({
      where: { id: notificationId },
    });
    if (!existingNotification) return { error: "Notification not found" };

    // Check if the user is the owner of the notification
    if (existingNotification.authUserId !== userId)
      return { error: "Unauthorized" };

    // Delete the notification from the database
    await client.notification.delete({ where: { id: notificationId } });

    revalidatePath("/notifications");
    // eslint-disable-next-line brace-style
  } catch (error) {
    // Log and return error if deletion fails
    console.error("Error deleting notification:", error);
    return { error: "Failed to delete notification" };
  }
}

// Deletes a post from the database.
export async function deletePost(post: Post) {
  try {
    // Authenticate the user and retrieve the current user
    const { userId } = auth();
    const user = await currentUser();
    if (!userId || !user) throw new Error("Unauthorized");

    // Check if the post exists in the database
    const existingPost = await client.post.findUnique({
      where: { id: post.id },
    });
    if (!existingPost) return { error: "unexisting" };

    // Check if the user is the author of the post
    if (existingPost.authUserId !== userId) return { error: "unauthorized" };

    // Delete the post from the database
    await client.post.delete({ where: { id: post.id } });

    revalidatePath("/learn");
    // eslint-disable-next-line brace-style
  } catch (error) {
    // Log and return error if deletion fails
    console.error("Error deleting post:", error);
    return { error: "failed" };
  }
}
