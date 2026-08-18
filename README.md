# GetEasyCV — Professional Resume Builder & SaaS Platform

[![Next.js](https://img.shields.io/badge/Next.js-16.2.4-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8?logo=tailwind-css)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-5.7-2D3748?logo=prisma)](https://www.prisma.io/)

**GetEasyCV** is an AI-powered, full-featured SaaS platform designed to build ATS-compliant, beautiful resumes easily. It features a live side-by-side template editor, real-time preview engine, PDF export capabilities, an isolated User Portal, and a 25-module Admin Panel with complete Role-Based Access Control (RBAC).

---

## 🚀 Key Features

### 👤 User Features & Workspace
- **Dynamic Template Gallery**: Browse 60+ template variants across ATS Friendly, Creative, Modern, Executive, and Minimalist categories.
- **Instant "Use & Edit CV" Action**: Create a resume directly in `/my-resumes` from any template card and jump straight into the editor.
- **Live Side-by-Side Resume Builder**:
  - Drag-and-drop section reordering (Summary, Experience, Education, Skills, Projects, Certifications, Languages).
  - Profile photo upload with automatic validation (<5MB).
  - Real-time zoom slider (20% – 100%).
  - Auto-save status indicators.
  - High-precision Vector PDF and JSON export.
- **My Resumes Dashboard**: Grid and list views, inline title renaming, duplicate, delete, and direct edit actions.
- **Unified Light Theme User Portal**: Sidebar navigation tabs for Dashboard, Resumes, Templates, Profile, Subscription, Downloads, and Settings.
- **Unified User Profile Dropdown**: Consistent user pill avatar and account menu across public navigation, user portal, and admin panel.

### ⚙️ Admin Control Panel (`/admin/*`)
- **Complete Role-Based Access Control (RBAC)**: Role checks guarding `/admin/*` routes and API endpoints. Non-admin users are safely redirected to `/dashboard`.
- **25 Administrative Suite Modules**:
  - **User & Role Management**: View, create, edit, elevate roles (`user` / `admin`), ban/activate user accounts.
  - **Resume & Template Management**: Manage user resumes, upload/edit template metadata, feature flags.
  - **Subscriptions & Invoices**: Manage plan tiers, billing history, and customer transactions.
  - **Analytics & Reports**: Visual revenue metrics, signup growth, template usage charts.
  - **CMS Suite**: Manage Blog posts, FAQs, Media library, Email templates.
  - **System Logs & Security**: View system activity logs, API key configurations, global app settings.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/) with Turbopack.
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict Mode, 0 compilation errors).
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with Lucide React icons.
- **Database & ORM**: PostgreSQL with [Prisma ORM](https://www.prisma.io/) (featuring graceful offline mock fallbacks).
- **State Management**: [Zustand](https://github.com/pmndrs/zustand) with localStorage persistence.
- **PDF Engine**: [jspdf](https://github.com/parallax/jsPDF) & [html2canvas](https://html2canvas.hertzen.com/).

---

## 📁 Project Folder Structure

```
Geteasycv/
├── app/                      # Next.js App Router Pages & API Routes
│   ├── (auth)/               # Auth routes (Login, Signup)
│   ├── admin/                # Admin Panel (25 modules)
│   ├── api/                  # REST API Endpoints (Auth, Users, Resumes, Analytics, etc.)
│   ├── dashboard/            # User Dashboard & Downloads Center
│   ├── editor/               # Real-time Live Resume Editor
│   ├── my-resumes/           # My Resumes Management
│   ├── templates/            # Template Gallery & Preview
│   ├── profile/              # User Profile Settings
│   ├── subscription/         # Subscription & Billing
│   └── layout.tsx            # Global Layout Wrapper
├── components/               # Reusable UI Components
│   ├── admin/                # Admin Layout, Header, Sidebar
│   ├── auth/                 # LoginForm, SignupForm, UserProfileDropdown
│   ├── cv/                   # Resume Layout Renderers & Section Variants
│   └── layout/               # UserLayout Sidebar Navigation
├── lib/                      # Core Libraries & Utilities
│   ├── db.ts                 # Prisma Client Connection
│   ├── generateTemplates.ts  # Template Registry & Generator
│   ├── middleware/           # Auth Guards & Security Utilities
│   └── store/                # Zustand Auth Store
├── prisma/                   # Database Schema & Migration Scripts
│   ├── schema.prisma         # Prisma Data Schema
│   └── seed.ts               # Database Seeding Script
├── public/                   # Static Assets (brand logo.svg, graphics)
└── package.json              # App Dependencies & Scripts
```

---

## 🚦 Getting Started

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm** or **yarn** or **pnpm**
- **PostgreSQL** (Optional — application automatically operates with resilient mock data if database is offline).

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Sanithakor/Geteasycv.git
   cd Geteasycv
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up Environment Variables**:
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

4. **Initialize Database** (Optional):
   ```bash
   npx prisma db push
   npx prisma db seed
   ```

5. **Run the Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📜 Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts Next.js development server with Turbopack |
| `npm run build` | Generates Prisma client & builds production bundle |
| `npm run start` | Launches production server |
| `npm run lint` | Runs ESLint syntax and rule checks |
| `npx tsc --noEmit` | Performs strict TypeScript type checks |
| `npm run db:push` | Pushes Prisma schema changes directly to database |
| `npm run db:seed` | Seeds database with initial templates & demo users |

---

## 🔐 Environment Variables (`.env`)

```ini
# Database
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/resume_builder?schema=public"

# Auth
JWT_SECRET="your-super-secret-jwt-key-change-in-production"

# App URLs
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

---

## 📄 License

© 2026 GetEasyCV. All rights reserved.
