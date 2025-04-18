import { PrismaClient } from '@prisma/client';
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seed...");

  const hashedPassword = await bcrypt.hash("1234", 10);

  for (let i = 1; i <= 10; i++) {
    await prisma.voter.create({
      data: {
        document: `DOC${i}`,
        name: `Voter${i}`,
        lastName: `LastName${i}`,
        dob: new Date(1990, i % 12 || 1, i), // evita mes 0
        isCandidate: i <= 2,
      },
    });
  }

  await prisma.admin.create({
    data: {
      name: "Admin",
      lastName: "User",
      email: "admin@email.com",
      password: hashedPassword,
    },
  });

  console.log("✅ Seed completed.");
}

main()
  .catch((e) => {
    console.error("❌ Error during seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
