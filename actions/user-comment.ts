'use server'

import { auth } from "@clerk/nextjs/server"
import client from "@/lib/prismadb"

export async function getPost(postId: string) {
  try {
    const post = await client.post.findUnique({
      where: { id: postId },
      include: {
        user: true,
        comments: {
          include: {
            user: true
          },
          orderBy: {
            createdAt: 'desc'
          }
        }
      }
    });
    return { success: true, data: post };
  } 
  catch (error) {
    console.error("Error fetching post:", error);
    return { success: false, error: "An error occurred while fetching the post" };
  }
}

export async function getCurrentUser() {
  try {
    const { userId } = auth();
    if (!userId) return { success: false, error: "Not authenticated" };

    const user = await client.user.findUnique({
      where: { authUserId: userId }
    });
    return { success: true, data: user };
  } catch (error) {
    console.error("Error fetching current user:", error);
    return { success: false, error: "An error occurred while fetching the user" };
  }
}

export async function createComment(postId: string, body: string) {
  try {
    const { userId } = auth();
    if (!userId) throw new Error("Not authenticated");

    const comment = await client.comment.create({
      data: {
        body,
        postId,
        authUserId: userId,
      },
      include: { user: true }
    });

    // Create a notification for the post owner
    const post = await client.post.findUnique({ where: { id: postId } });
    if (post && post.authUserId !== userId) {
      await client.notification.create({
        data: {
          body: `Someone commented on your post`,
          authUserId: post.authUserId,
          type: "COMMENT",
        },
      });
    }

    return { success: true, data: comment };
  } 
  catch (error) {
    console.error("Error creating comment:", error);
    return { success: false, error: "An error occurred while creating the comment" };
  }
}


export async function likeCommentToggle(commentId: string) {
  try {
    const { userId } = auth()
    if (!userId) throw new Error("Not authenticated")

    const comment = await client.comment.findUnique({
      where: { id: commentId },
      include: { post: true }
    })

    if (!comment) throw new Error("Comment not found")

    const hasLiked = comment.likedIds.includes(userId)

    await client.comment.update({
      where: { id: commentId },
      data: {
        likedIds: hasLiked
          ? { set: comment.likedIds.filter(id => id !== userId) }
          : { push: userId }
      }
    })

    // Create a notification for the comment owner if it's a new like
    if (!hasLiked && comment.authUserId !== userId) {
      await client.notification.create({
        data: {
          body: `Someone liked your comment on a post`,
          authUserId: comment.authUserId,
          type: "LIKE"
        }
      })
    }

    return { success: true }
  } 
  catch (error) {
    console.error("Error toggling comment like:", error);
    return { success: false, error: "An error occurred while toggling the comment like" };
  }
}