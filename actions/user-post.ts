"use server";

import { revalidatePath } from "next/cache";
import { toast } from "sonner";

import client from "@/lib/prismadb";
import { auth, currentUser } from "@clerk/nextjs/server";
import { Category, Post } from "@prisma/client";

// Types
type CreatePostData = {
  content: string;
  category: string;
  imageUrl?: string;
};

// Creates a new post in the database.
export async function createPost({ content, category }: CreatePostData) {
  try {
    // Authenticate the user
    const { userId } = auth();
    if (!userId) {
      return { error: "not-authenticated" };
    }

    // Create the post in the database
    const post = await client.post.create({
      data: {
        body: content,
        category: category as Category,
        authUserId: userId,
        likedIds: [],
      },
    });

    // Revalidate specific path to ensure up-to-date data on relevant pages
    revalidatePath("/learn");

    // Return a success response with the created post data
    return { success: true, data: post };
    // eslint-disable-next-line brace-style
  } catch (error) {
    // Log and return error if post creation fails
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

    revalidatePath("/learn");

    // Return a success response
    return { error: false, message: "Success" };
    // eslint-disable-next-line brace-style
  } catch (error) {
    // Log and return error if toggle fails
    console.error("Error toggling like status:", error);
    return { error: true, message: "An error occurred" };
  }
}
