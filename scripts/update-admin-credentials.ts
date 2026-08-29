import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const email = 'sthakor890@gmail.com';
  const plainPassword = 'dUPQHq;Eb&fcv';

  console.log(`Updating admin user: ${email}...`);

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(plainPassword, salt);

  const admin = await prisma.user.upsert({
    where: { email },
    update: {
      password: hashedPassword,
      role: 'admin',
      subscriptionTier: 'pro',
      name: 'Admin',
    },
    create: {
      email,
      password: hashedPassword,
      name: 'Admin',
      role: 'admin',
      subscriptionTier: 'pro',
      emailVerified: new Date(),
    },
  });

  console.log(`✅ Admin credentials updated successfully!`);
  console.log(`Email: ${admin.email}`);
  console.log(`Role: ${admin.role}`);
}

main()
  .catch((err) => {
    console.error('Error updating admin user:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
