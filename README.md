# Munim Ji — Your Personal Business Manager

> **Tagline:** Your Personal Business Manager  
> **Target Audience:** Indian Business Owners, SMEs & Multi-business Operators  
> **Tech Stack:** React 18/19, TypeScript, Vite, Tailwind CSS, Supabase (PostgreSQL, Auth, RLS, Storage, Realtime, Edge Functions)

---

## 🚀 Quick Start

### 1. Prerequisites
- **Node.js (v20+ LTS):** [Download from nodejs.org](https://nodejs.org/)
- **Supabase Account / CLI:** [supabase.com](https://supabase.com/)

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Populate `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` with your project's credentials.

### 4. Run Development Server
```bash
npm run dev
```

---

## 🏛️ Architecture & Governance

- **Documentation Pack:** Located in [Munim_Ji_Antigravity_Documentation_Pack/](Munim_Ji_Antigravity_Documentation_Pack/)
- **Master Plan:** [docs/IMPLEMENTATION_PLAN.md](docs/IMPLEMENTATION_PLAN.md)
- **Decisions Log:** [docs/DECISIONS.md](docs/DECISIONS.md)
- **Database Migrations:** [supabase/migrations/](supabase/migrations/)
- **Coding Rules:** [AGENTS.md](AGENTS.md)

---

## 🔒 Security Principles
1. **Multi-Tenant Row Level Security (RLS)** is enforced at the database level. Frontend filtering is never relied upon as a security boundary.
2. **Deterministic Financial Math:** Financial arithmetic is computed in PostgreSQL/TypeScript functions; AI never computes numbers.
3. **Zero Secrets in Client Bundle:** Never expose service-role keys or AI provider secrets in client-side code.
