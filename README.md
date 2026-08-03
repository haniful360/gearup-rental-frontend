# 🏋️‍♂️ GearUp - Outdoor & Fitness Equipment Rental Platform

**GearUp** is a full-stack Next.js web application designed for renting top-quality outdoor gear and fitness equipment. It connects gear owners (Providers) with outdoor enthusiasts and fitness lovers (Customers), all managed through a centralized Admin control panel.

---

## ✨ Key Features & User Journeys

### 1. 👤 Customer Journey
- **Browse & Search**: Explore available gears with category filters and search capabilities.
- **Rental Booking**: Select rental dates, calculate pricing, and place rental orders.
- **My Orders & Payments**: Track order statuses, view rental history, and process payments.
- **Reviews & Ratings**: Leave reviews and ratings for rented equipment.
- **Profile & Settings**: Manage personal account details and preferences.

### 2. 🏪 Provider Journey
- **Inventory Management**: Add, update, and manage listed rental items with images and details.
- **Rental Requests**: View incoming customer rental requests, accept or update order statuses.
- **Overview & Analytics**: Track active rentals, earnings, and inventory statistics.

### 3. 🛡️ Admin Journey
- **User Management**: View, manage, update, or restrict user accounts across the platform.
- **Gear Moderation**: Review and approve/reject newly submitted gear listings from providers.
- **Categories & Rentals**: Manage rental categories and monitor platform-wide rental activities.

### 4. 🔒 Authentication & Route Protection
- **Role-Based Access Control (RBAC)**: Enforced via Next.js `Proxy` and Server Component Data Access Layer (DAL).
- **Secure Route Guards**: Prevents unauthorized access to `/dashboard`, redirecting users strictly to their role-specific pages (`/dashboard/customer`, `/dashboard/provider`, `/dashboard/admin`).

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router with Server Actions & Turbopack)
- **UI & Styling**: React 19, Tailwind CSS v4, Lucide Icons, Shadcn UI
- **State & Forms**: Redux Toolkit, React Hook Form, Zod validation
- **Notifications**: Sonner

---

## 🚀 Getting Started

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/haniful360/gearup-rental-frontend.git
cd gearup-rental-frontend
npm install
```

### 2. Configure Environment Variables
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
BACKEND_API_URL=https://gearup-assignment-seven.vercel.app
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.
