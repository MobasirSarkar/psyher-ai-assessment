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
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_SUPABASE_KEY=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/events
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/events
NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL=/events
NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL=/events

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

| Tier      | Email               | Password    |
|-----------|---------------------|-------------|
| Free      | `free+clerk_test@gmail.com`   | `Free@1243`  |
| Silver    | `silver+clerk_test@gmail.com` | `Silver@1243`  |
| Gold      | `gold+clerk_test@gmail.com`   | `Gold@12435`  |
| Platinum  | `platinum+clerk_test@gmail.com`   | `Platinum@1243`  |

---

## 🧪 Testing User Tiers

> You can simulate user roles by modifying the Clerk `publicMetadata.tier` field from the Clerk dashboard manually or through code.

---


