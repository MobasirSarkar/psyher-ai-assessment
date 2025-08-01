# 🎭 Tier-Based Event Showcase

A responsive and elegant web application that allows logged-in users to view a list of events based on their user tier — Free, Silver, Gold, or Platinum.

This project uses:

- ✅ Next.js 14 (App Router)
- 🔐 Clerk.dev for authentication
- 🧠 Supabase (PostgreSQL) for backend data
- 🎨 Tailwind CSS for styling

---

## 🛠️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/tier-based-event-showcase.git
cd tier-based-event-showcase
```

### 2. Install dependencies

```bash
pnpm install
# or
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the root:

```env
# Clerk
CLERK_SECRET_KEY=sk_test_***
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_***
NEXT_PUBLIC_CLERK_FRONTEND_API=clerk.***.lcl.dev
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-public-anon-key
NEXT_PUBLIC_SUPABASE_KEY=your-service-role-key
```

Make sure you've added a **JWT template named `supabase`** in your Clerk dashboard for Supabase access.

---

### 4. Run the Development Server

```bash
pnpm dev
# or npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Demo Credentials

> Replace the `EMAIL` and `PASSWORD` values below with real ones you created in Clerk dashboard.

| Tier      | Email               | Password    |
|-----------|---------------------|-------------|
| Free      | `FREE_EMAIL_HERE`   | `PASSWORD`  |
| Silver    | `SILVER_EMAIL_HERE` | `PASSWORD`  |
| Gold      | `GOLD_EMAIL_HERE`   | `PASSWORD`  |
| Platinum  | `PLAT_EMAIL_HERE`   | `PASSWORD`  |

---

## 🧪 Testing User Tiers

> You can simulate user roles by modifying the Clerk `publicMetadata.tier` field from the Clerk dashboard manually or through code.

---

## 📩 Contact

If you have questions or issues, reach out to the team at: [your@email.com]