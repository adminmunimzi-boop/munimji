# Munim Ji — QA Plan & Acceptance Tests
**Release policy:** No phase is complete because a screen merely renders. Test the complete user journey and its authorization boundary.

## 1. Core functional test cases
### Authentication and profile
- Owner can register, log in, log out and recover account access.
- Invalid credentials and expired sessions produce safe errors.
- Profile photo upload validates type/size and uses private or appropriately protected storage.
- Language preference persists.

### New vs Existing business
- New business requires the agreed investment setup fields.
- Existing business displays only the short Business Snapshot.
- Existing-business snapshot does not force historical backfill.
- Existing business marked recovered does not display recovery progress.
- A business start type cannot be accidentally changed by editing an unrelated field.

### Managers and reports
- Owner can create and assign a manager.
- Manager sees only assigned reporting workflow.
- Daily report validates amounts, date, required fields and duplicate behavior.
- Partial report shows yellow; complete submission shows green; missed deadline shows red according to business timezone/cutoff.
- Reassignment and deactivation revoke access.
- Late edits update calendar and metrics consistently.

### Dashboard and detail
- Dashboard cards show correct values for seeded known datasets.
- Missing data is shown as unavailable/insufficient, not zero.
- Chart mode switch changes dataset/label correctly.
- Business color mapping stays stable.
- All five detail tabs work on mobile and desktop.
- Realtime update arrives for authorized business and never exposes other businesses.

### AI
- Under calibration threshold, verdict remains Learning.
- Sufficient-quality metrics allow structured verdict generation.
- Invalid LLM JSON is rejected and produces safe fallback.
- Ask Munim Ji says when data is missing.
- Answer includes relevant period/evidence and cannot retrieve another tenant's data.
- Prompt injection in report notes does not change system rules.
- Cost/rate limits work.

### Consultation, PDF, localization
- Consultation request persists and status transitions are visible.
- Payment is marked successful only after verified provider confirmation, if in-app payment is enabled.
- Duplicate webhook is idempotent.
- PDF includes embedded watermark, report period, generation time and correct scope.
- Unauthorized PDF access fails.
- English/Hindi toggle covers all user-facing strings, AI response path and PDFs; numeric values remain unchanged.
- Definitions are available in both languages.

## 2. Minimum security suite
- Direct API/REST tests for owner and manager cross-tenant isolation.
- RLS tests for all CRUD operations on tenant-owned tables.
- Edge Function authorization tests.
- Storage object authorization tests.
- Realtime isolation tests.
- Role/assignment tampering tests.
- Secret scanning and dependency vulnerability review.

## 3. Quality gates
A release candidate is blocked if:
- Any cross-tenant access test fails.
- A privileged secret is present in client bundle or repository.
- Any core CTA is dead or fakes success.
- Critical financial formulas are undocumented.
- AI gives a confident verdict during calibration.
- PDF watermark is only a UI overlay.
- Build/typecheck fails without an explicitly accepted exception.
- Critical/high security issues remain open.

## 4. Seed data
Use synthetic fixtures only: two owners, two businesses, two managers, at least 30 days of varied reports, missing days, partial reports, recovered existing business and low-data new business. Include edge cases for zero revenue, zero expenses, negative adjustments if allowed, large values, timezone boundaries and duplicate submissions.

## 5. Manual sign-off
- Product owner: definitions and workflows.
- Developer: build, tests, migrations and release notes.
- Independent Supabase/Postgres reviewer: RLS and tenant isolation before managers go live.
- Business/finance reviewer: metric formulas and labels.
