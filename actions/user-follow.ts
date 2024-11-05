"use server";
import { revalidatePath } from "next/cache";
import { auth, currentUser } from "@clerk/nextjs/server";
import { User } from "@prisma/client";
import client from "@/lib/prismadb";

// Toggle follow status for a user
export async function followUserToggle(userToFollow: User) {
  try {
    // Authenticate the user and retrieve the current user
    const { userId } = auth();
    const user = await currentUser();
    if (!userId || !user) throw new Error("Unauthorized");

    // Check if the target user exists in the database
    const targetUser = await client.user.findUnique({
      where: { id: userToFollow.id },
    });
    if (!targetUser) return { error: true, message: "User not found" };

    // Get the current user's data from your database
    const currentDbUser = await client.user.findUnique({
      where: { authUserId: userId },
    });
    if (!currentDbUser)
      return { error: true, message: "Current user not found in database" };

    // Check if already following
    const isFollowing = currentDbUser.followingIds.includes(userToFollow.id);

    // Toggle follow status
    const updatedFollowingIds = isFollowing
      ? currentDbUser.followingIds.filter((id) => id !== userToFollow.id)
      : [...currentDbUser.followingIds, userToFollow.id];

    // Update the current user's following list
    await client.user.update({
      where: { id: currentDbUser.id },
      data: { followingIds: updatedFollowingIds },
    });

    revalidatePath("/profile");
    revalidatePath(`/profile/${userToFollow.username}`);

    return {
      error: false,
      message: isFollowing
        ? "Unfollowed successfully"
        : "Followed successfully",
    };
    // eslint-disable-next-line brace-style
  } catch (error) {
    console.error("Error toggling follow status:", error);
    return { error: true, message: "An error occurred" };
  }
}
