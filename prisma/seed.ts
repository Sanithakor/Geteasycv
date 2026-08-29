import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  try {
    // Hash demo password
    const hashedPassword = await bcrypt.hash('DemoPassword123', 10);

    // 1. Create demo user (free tier)
    const demoUser = await prisma.user.upsert({
      where: { email: 'demo@example.com' },
      update: {}, // Don't update if exists
      create: {
        email: 'demo@example.com',
        password: hashedPassword,
        name: 'Demo User',
        subscriptionTier: 'free',
        role: 'user',
        profile: {
          create: {
            timezone: 'UTC',
            language: 'en',
          },
        },
        subscription: {
          create: {
            plan: 'free',
            status: 'active',
            resumes: 3,
            storage: 100,
            aiCredits: 10,
          },
        },
      },
    });

    console.log('✅ Demo user created:', demoUser.email);

    // 2. Create admin user
    const adminHashedPassword = await bcrypt.hash('dUPQHq;Eb&fcv', 10);
    const adminUser = await prisma.user.upsert({
      where: { email: 'sthakor890@gmail.com' },
      update: {
        password: adminHashedPassword,
        role: 'admin',
      },
      create: {
        email: 'sthakor890@gmail.com',
        password: adminHashedPassword,
        name: 'Admin User',
        subscriptionTier: 'premium',
        role: 'admin',
        profile: {
          create: {
            timezone: 'UTC',
            language: 'en',
          },
        },
        subscription: {
          create: {
            plan: 'premium',
            status: 'active',
            resumes: 100,
            storage: 5000,
            aiCredits: 1000,
          },
        },
      },
    });

    console.log('✅ Admin user created:', adminUser.email);

    // 3. Create light theme
    const lightTheme = await prisma.themeConfig.upsert({
      where: { slug: 'light-theme' },
      update: {},
      create: {
        name: 'Light Theme',
        slug: 'light-theme',
        primary: '#3B82F6',
        secondary: '#8B5CF6',
        accent: '#EC4899',
        background: '#FFFFFF',
        text: '#1F2937',
        textMuted: '#6B7280',
        border: '#E5E7EB',
        fontFamily: 'Inter',
        fontSizeBase: 16,
        lineHeight: 1.5,
        borderRadius: '12px',
      },
    });

    console.log('✅ Light theme created:', lightTheme.name);

    // 4. Create dark theme
    const darkTheme = await prisma.themeConfig.upsert({
      where: { slug: 'dark-theme' },
      update: {},
      create: {
        name: 'Dark Theme',
        slug: 'dark-theme',
        primary: '#60A5FA',
        secondary: '#A78BFA',
        accent: '#F472B6',
        background: '#111827',
        text: '#F3F4F6',
        textMuted: '#D1D5DB',
        border: '#374151',
        fontFamily: 'Inter',
        fontSizeBase: 16,
        lineHeight: 1.5,
        borderRadius: '12px',
      },
    });

    console.log('✅ Dark theme created:', darkTheme.name);

    // 5. Create sample templates
    const sampleTemplate = await prisma.template.upsert({
      where: { slug: 'modern-professional' },
      update: {},
      create: {
        name: 'Modern Professional',
        slug: 'modern-professional',
        category: 'professional',
        layout: 'two-column',
        blocks: {},
        thumbnail: '/templates/modern-professional.png',
        isPremium: false,
        isATS: true,
        downloads: 1500,
        uses: 800,
        rating: 4.8,
        reviewCount: 234,
        status: 'active',
        createdById: adminUser.id,
        themeId: lightTheme.id,
      },
    });

    console.log('✅ Sample template created:', sampleTemplate.name);

    console.log('\n🎉 Database seeded successfully!');
    console.log('\n📝 Demo Credentials:');
    console.log('   Email: demo@example.com');
    console.log('   Password: DemoPassword123');
    console.log('\n👨‍💼 Admin Credentials:');
    console.log('   Email: admin@example.com');
    console.log('   Password: DemoPassword123');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error('❌ Fatal error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
