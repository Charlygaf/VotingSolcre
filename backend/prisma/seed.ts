import { PrismaClient } from '@prisma/client';
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seed...");

  const hashedPassword = await bcrypt.hash("1234", 10);

  const names = [
    { name: 'Pablo', lastName: 'Pérez' },
    { name: 'Lucía', lastName: 'González' },
    { name: 'María', lastName: 'Fernández' },
    { name: 'Carlos', lastName: 'Rodríguez' },
    { name: 'Sofía', lastName: 'Martínez' },
    { name: 'Juan', lastName: 'López' },
    { name: 'Valentina', lastName: 'Díaz' },
    { name: 'Martín', lastName: 'Sánchez' },
    { name: 'Ana', lastName: 'Romero' },
    { name: 'Federico', lastName: 'Castro' },
  ];

  for (let i = 0; i < names.length; i++) {
    await prisma.voter.create({
      data: {
        document: `DOC${i + 1}`,
        name: names[i].name,
        lastName: names[i].lastName,
        dob: new Date(1990, (i % 12) || 1, (i + 1)), // evita mes 0
        isCandidate: i < 2, // los primeros dos serán candidatos
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
