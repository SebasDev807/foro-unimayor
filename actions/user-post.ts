"use server";

import client from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { Category } from "@prisma/client";

import { revalidatePath } from "next/cache";

type CreatePostData = {
  content: string;
  category: string;
  // pollOptions?: string[];
  imageUrl?: string;
};

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
  } catch (error) {
    console.error("Error al crear el post:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error al crear el post",
    };
  }
}
