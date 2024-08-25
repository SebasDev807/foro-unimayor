import client from "@/lib/prismadb";

async function main() {
  // remove all existing data
  await client.user.deleteMany();
  await client.post.deleteMany();

  // insert test data
  // await client.user.createMany({
  //   data: [
  //     {
  //       authUserId: "user1",
  //       username: "user1",
  //       bio: "Bio for user1",
  //       email: "user1@example.com",
  //       emailVerified: new Date(),
  //       image: "https://example.com/user1.jpg",
  //       coverImage: "https://example.com/user1-cover.jpg",
  //       profileImage: "https://example.com/user1-profile.jpg",
  //       createdAt: new Date(),
  //       updatedAt: new Date(),
  //       hasNewNotifications: false,
  //     },
  //     {
  //       authUserId: "user2",
  //       username: "user2",
  //       bio: "Bio for user2",
  //       email: "user2@example.com",
  //       emailVerified: new Date(),
  //       image: "https://example.com/user2.jpg",
  //       coverImage: "https://example.com/user2-cover.jpg",
  //       profileImage: "https://example.com/user2-profile.jpg",
  //       createdAt: new Date(),
  //       updatedAt: new Date(),
  //       hasNewNotifications: false,
  //     },
  //     // Agrega más usuarios de prueba según sea necesario
  //   ],
  // });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await client.$disconnect();
  });
