#!/bin/bash

# Database Setup Script for Resume Builder SaaS

echo "🚀 Starting database setup..."

# 1. Generate Prisma Client
echo "📦 Generating Prisma client..."
npx prisma generate

# 2. Push schema to database (creates tables)
echo "🔄 Pushing schema to database..."
npx prisma db push --skip-generate

# 3. Run migrations
echo "📝 Running migrations..."
npx prisma migrate dev --name init

# 4. Seed database with demo data
echo "🌱 Seeding database..."
npx prisma db seed

# 5. Verify setup
echo "✅ Database setup complete!"
echo ""
echo "📊 Opening Prisma Studio to verify..."
npx prisma studio

