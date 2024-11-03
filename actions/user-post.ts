"use server";

import client from "@/lib/prismadb";
import { auth, currentUser } from "@clerk/nextjs/server";
import { Category, Post } from "@prisma/client";

import { revalidatePath } from "next/cache";

type CreatePostData = {
  content: string;
  category: string;
  // pollOptions?: string[];
  imageUrl?: string;
};

/** */
export async function createPost({
  content,
  category,
}: // pollOptions,
// imageUrl,
CreatePostData) {
  try {
    const { userId } = auth();

    if (!userId) {
      throw new Error("Usuario no autenticado");
    }

    const post = await client.post.create({
      data: {
        body: content,
        category: category as Category, // Asegúrate que category sea del tipo esperado
        authUserId: userId,
        likedIds: [], // Inicializa el array si es necesario en el modelo
        // imageUrl, // Agrega la URL de la imagen si existe
      },
    });

    // revalidatePath("/courses");
    revalidatePath("/learn");
    // redirect("/learn");

    return { success: true, data: post };
    // eslint-disable-next-line brace-style
  } catch (error) {
    console.error("Error al crear el post:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error al crear el post",
    };
  }
}

/** */
export async function likePostToggle(post: Post) {
  try {
    // Validate auth user
    const { userId } = auth();
    const user = await currentUser();
    if (!userId || !user) throw new Error("Unauthorized");

    // Check if the post exists
    const existingPost = await client.post.findUnique({
      where: {
        id: post.id,
      },
    });
    if (!existingPost) return { error: true, message: "Post not found" };

    // Toggle like
    const hasLike = existingPost.likedIds.includes(userId);
    let updatedLikes;
    if (!hasLike) updatedLikes = [...existingPost.likedIds, userId];
    else updatedLikes = existingPost.likedIds.filter((id) => id !== userId);

    await client.post.update({
      where: {
        id: post.id,
      },
      data: {
        likedIds: updatedLikes,
      },
    });

    return { error: false, message: "Success" };
    // eslint-disable-next-line brace-style
  } catch (error) {
    console.error(error);
    return { error: true, message: "An error occurred" };
  }
}
