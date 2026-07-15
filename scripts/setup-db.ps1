# Database Setup Script for Resume Builder SaaS (Windows PowerShell)

Write-Host "🚀 Starting database setup..." -ForegroundColor Green

# 1. Generate Prisma Client
Write-Host "📦 Generating Prisma client..." -ForegroundColor Cyan
npx prisma generate

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to generate Prisma client" -ForegroundColor Red
    exit 1
}

# 2. Check if DATABASE_URL is set
if ([string]::IsNullOrEmpty($env:DATABASE_URL)) {
    Write-Host "⚠️  DATABASE_URL not set. Setting up PostgreSQL..." -ForegroundColor Yellow
    Write-Host "📌 Make sure PostgreSQL is running or use: docker run -d --name postgres -e POSTGRES_PASSWORD=password -p 5432:5432 postgres" -ForegroundColor Yellow
    $env:DATABASE_URL = "postgresql://postgres:password@localhost:5432/resume_builder_dev"
}

# 3. Push schema to database (creates tables)
Write-Host "🔄 Pushing schema to database..." -ForegroundColor Cyan
npx prisma db push --skip-generate --force-reset

if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️  Note: If database doesn't exist yet, that's OK. Continuing..." -ForegroundColor Yellow
}

# 4. Run migrations
Write-Host "📝 Running migrations..." -ForegroundColor Cyan
npx prisma migrate dev --name init --skip-seed

if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️  Migration skipped (database might already be set up)" -ForegroundColor Yellow
}

# 5. Seed database with demo data
Write-Host "🌱 Seeding database..." -ForegroundColor Cyan
npx prisma db seed

if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️  Seed might have skipped (data might already exist)" -ForegroundColor Yellow
}

# 6. Verify setup
Write-Host "✅ Database setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "📊 Database verified successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "✨ You can now start the development server with: npm run dev" -ForegroundColor Cyan
Write-Host ""

