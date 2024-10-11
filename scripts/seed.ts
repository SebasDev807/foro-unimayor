import client from "@/lib/prismadb";

async function main() {
  // Clear all existing data
  console.log("Clearing data...");
  await client.user.deleteMany();
  await client.post.deleteMany();
  await client.comment.deleteMany();

  console.log("Seeding data...");

  // Insert test data
  if (!process.env.MANAGER_USER_ID || !process.env.MANAGER_USER_FULLNAME) {
    throw new Error("MANAGER credentials not well defined");
  }

  // Create a new user
  const user = await client.user.create({
    data: {
      authUserId: process.env.MANAGER_USER_ID,
      username: process.env.MANAGER_USER_FULLNAME,
      bio: "Bio for user manager",
      email: "user1@example.com",
      emailVerified: new Date(),
      image: "https://example.com/user1.jpg",
      coverImage: "https://example.com/user1-cover.jpg",
      profileImage: "https://example.com/user1-profile.jpg",
      createdAt: new Date(),
      updatedAt: new Date(),
      hasNewNotifications: false,
    },
  });

  // console.log("User created: ", user.username);

  // Insert a post for the created user
  const post = await client.post.create({
    data: {
      body: "This is a sample post body.",
      category: "PROGRAMACION", // Use a valid category from the Category enum
      createdAt: new Date(),
      updatedAt: new Date(),
      authUserId: user.authUserId,
      likedIds: [], // Initialize with an empty array if needed
    },
  });

  // Insert a comment for the created post
  const comment = await client.comment.create({
    data: {
      body: "This is a sample comment body.",
      createdAt: new Date(),
      updatedAt: new Date(),
      authUserId: user.authUserId,
      postId: post.id,
      likedIds: [], // Initialize with an empty array if needed
    },
  });

  // console.log("Post created: ", post.body);

  console.log("Data seeded successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await client.$disconnect();
  });
