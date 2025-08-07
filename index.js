const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // ✅ Hapus semua post yang terhubung ke user
  await prisma.post.deleteMany({
    where: {
      author: {
        email: "husni@example.com",
      },
    },
  });

  // ✅ Hapus user yang sudah ada (kalau ada)
  await prisma.user.deleteMany({
    where: { email: "husni@example.com" },
  });

  // ✅ CREATE
  const newUser = await prisma.user.create({
    data: {
      name: "Husni Fatah",
      email: "husni@example.com",
      posts: {
        create: {
          title: "Postingan Pertama",
          content: "Halo dunia dari Prisma!",
        },
      },
    },
  });
  console.log("✅ User created:", newUser);

  // 📖 READ
  const users = await prisma.user.findMany({
    include: { posts: true },
  });
  console.log("📋 All users:", users);

  // ✏️ UPDATE
  const updatedUser = await prisma.user.update({
    where: { id: newUser.id },
    data: { name: "Husni Update" },
  });
  console.log("✏️ User updated:", updatedUser);

  // 🗑️ DELETE
  const deletedUser = await prisma.user.delete({
    where: { id: newUser.id },
  });
  console.log("🗑️ User deleted:", deletedUser);
}

main()
  .catch((e) => {
    console.error("❌ Error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
