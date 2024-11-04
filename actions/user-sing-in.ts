"use server";
// TODO: Solve errot when insert a new user, don't appear the name, email, etc.

import { auth, currentUser } from "@clerk/nextjs/server";
import { getAuthUser } from "@/prisma/queries";

import client from "@/lib/prismadb";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

/**
 * Inserts a new user into the database.
 */
export const insertUser = async () => {
  const { userId } = auth();
  const user = await currentUser();

  if (!userId || !user) {
    throw new Error("Unauthorized");
  }

  const existingUser = await getAuthUser();
  if (existingUser) {
    revalidatePath("/courses");
    revalidatePath("/learn");
    redirect("/");
    // eslint-disable-next-line brace-style
  } else {
    // TODO: proveide another way to generate username if extension is gmail, yahoo, etc.
    // Obtener la base del nombre de usuario a partir del email
    const email = user.emailAddresses[0].emailAddress;
    let baseUsername = email.split("@")[0];
    let username = baseUsername;
    let suffix = 1;

    // Verificar si el nombre de usuario ya existe y generar uno único si es necesario
    while (await client.user.findUnique({ where: { username } })) {
      username = `${baseUsername}${suffix}`;
      suffix++;
    }

    await client.user.create({
      data: {
        authUserId: userId,
        name: user.username,
        username,
        bio: "...",
        email,
        emailVerified: email ? new Date() : null,
        image: user.imageUrl,
        coverImage: user.imageUrl,
        profileImage: user.imageUrl,
        createdAt: new Date(),
        updatedAt: new Date(),
        hasNewNotifications: false,
      },
    });

    revalidatePath("/");
    revalidatePath("/learn");
    redirect("/");
  }
};
