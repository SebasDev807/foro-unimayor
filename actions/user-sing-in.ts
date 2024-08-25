"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import { getAuthUser } from "@/prisma/queries";

import client from "@/lib/prismadb";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

/**
 * Inserts a new user into the database.
 *
 * @throws {Error} Throws an error if the user is not authenticated or the course is not found.
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
  } else {
    // TODO: proveide another way to generate username if extension is gmail, yahoo, etc.
    const email = user.emailAddresses[0].emailAddress;
    let baseUsername = "@" + email.split("@")[0]; // Generar nombre de usuario basado en la parte antes del "@"
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
