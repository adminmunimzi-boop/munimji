# Munim Ji — Antigravity Implementation Roadmap
**Approach:** Vertical slices, not a one-shot “build the whole app” prompt.

## Phase 0 — Workspace and decisions
- Inspect repo, toolchain, Supabase projects and current code.
- Confirm hosting, provider choices, currency/financial definitions, consultation payment behavior and reporting timezone.
- Create `AGENTS.md`, docs folder, decision log, `.env.example`, lint/typecheck/test scripts.
- Establish staging project and migration workflow.
**Gate:** human approves architecture and decisions; no production writes.

## Phase 1 — Foundation and auth
- React/TypeScript scaffold, routing, design tokens and responsive shell.
- Supabase client using public anon/publishable key only.
- Owner auth, profiles, language preference, error/loading states.
- First migrations and RLS for profiles.
**Gate:** auth tests and profile RLS pass.

## Phase 2 — Business onboarding and baseline
- Business create/edit/switch.
- New vs Existing fork.
- New-business investment setup.
- Existing-business snapshot.
- Recovered-investment metric suppression.
**Gate:** data persistence, validation, and seeded formula tests pass.

## Phase 3 — Manager reporting layer
- Manager invitation/account lifecycle.
- Assignments and scoped manager routes.
- Daily report form and calendar.
- Audit events for assignment changes.
- Cross-tenant RLS and direct API tests.
**Gate:** independent paid RLS review before real managers go live.

## Phase 4 — Metrics and owner control room
- Agree metric formulas first.
- Build scheduled metrics refresh.
- Dashboard cards and one switchable vertical bar chart.
- Five business-detail tabs.
- Scoped Realtime.
**Gate:** known-dataset tests reconcile exactly.

## Phase 5 — Munim Ji AI
- Learning/calibration state.
- Structured verdict schema and Edge Function.
- Ask Munim Ji with evidence-grounded context.
- Alerts, notification bell and action routing.
- Cost controls, logs and safe fallbacks.
**Gate:** daily reports flow; metrics verified; prompt-injection and tenant-scope tests pass.

## Phase 6 — Consultation, PDFs and polish
- Consultation request flow; Razorpay only if paid-in-app is confirmed.
- Email/WhatsApp/callback provider integration.
- PDF generation and embedded watermark.
- Full Hindi translation pass, definition popups, mobile nav.
- Accessibility and end-to-end QA.
**Gate:** payment/PDF/privacy tests pass.

## Phase 7 — Staging release and controlled pilot
- Deploy staging, run full regression and security suite.
- Pilot with synthetic data first, then a small number of consenting real businesses.
- Monitor report completion, AI quality, error rates and support issues.
- Fix issues before broader launch.

## Suggested task sizing
Each Antigravity task should be small enough to review in one diff: one flow, one migration, one integration or one test suite. Avoid asking the agent to implement multiple phases in a single prompt.
