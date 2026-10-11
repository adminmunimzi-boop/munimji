# Munim Ji — Technical Requirements Document (TRD)
**Version:** 1.0 | **Date:** 11 October 2026  
**Build environment:** Google Antigravity IDE (not Lovable)  
**Backend:** Supabase — Auth, PostgreSQL, RLS, Storage, Realtime, Edge Functions  
**Frontend recommendation:** React + TypeScript + Vite, responsive component system, React Router, TanStack Query or equivalent  
**AI:** LLM API called server-side through Supabase Edge Functions  
**Localization:** i18next or equivalent

## 1. Architecture principles
1. Antigravity is the development environment/agentic coding workflow; it is not the production backend.
2. Source code, SQL migrations, environment examples, tests and deployment instructions must live in version control.
3. Frontend must never contain service-role keys, LLM secrets, payment secrets or privileged API credentials.
4. Supabase RLS is the security boundary, not a substitute for server-side authorization checks and not something to simulate only in the UI.
5. Metrics are deterministically calculated in SQL/functions; LLM explains metrics but does not become the source of financial arithmetic.
6. Separate local/development, staging and production environments. Never point autonomous code changes at production by default.

## 2. Logical architecture
- **Web client:** screens, forms, chart, localization, responsive navigation.
- **Supabase Auth:** sessions and identity.
- **Postgres:** canonical business data, derived metrics, alert records and audit records.
- **RLS:** owner/manager row access policy.
- **Edge Functions:** privileged workflows—AI verdicts, Ask Munim Ji, payment verification/webhooks, PDF generation orchestration and support-controlled actions.
- **Scheduled jobs:** refresh metrics, determine missed reports, create alerts and trigger calibration/verdict jobs.
- **External providers:** LLM API, Razorpay (if payment is collected in-app), email provider, WhatsApp provider, PDF provider initially.
- **Storage:** private report PDFs and profile images with signed, short-lived download links.

## 3. Suggested repository structure
```text
munim-ji/
  AGENTS.md
  README.md
  .env.example
  docs/
    PRD.md
    TRD.md
    DATA_DICTIONARY.md
    AI_AGENT_PLAYBOOK.md
    SECURITY_AND_RLS.md
    QA_ACCEPTANCE.md
    RELEASE_RUNBOOK.md
  src/
    app/
    components/
    features/
      auth/
      businesses/
      managers/
      reports/
      dashboard/
      alerts/
      munim-ai/
      consultation/
      reports-export/
      profile/
    i18n/
    lib/
    routes/
    styles/
  supabase/
    migrations/
    functions/
      ai-verdict/
      ask-munim/
      payment-webhook/
      generate-report/
      manager-invite/
    seed.sql
  tests/
    unit/
    integration/
    e2e/
    security/
```

## 4. Database entities
Create versioned SQL migrations. Exact columns and enums must be finalized in the data dictionary before implementation. Core entities:
- profiles
- businesses
- business_baseline_snapshots
- business_managers
- manager_assignments
- business_investments
- business_settings
- daily_reports
- reporting_calendar
- business_metrics
- business_history
- alerts
- notifications
- ai_verdicts
- ai_conversations
- consultancy_requests
- generated_reports
- audit_logs (recommended)
- payment_events (recommended if Razorpay is enabled)

Every business-scoped row must have a clear business_id or a documented ownership path. Add indexes to foreign keys and frequent filters. Use created_at/updated_at and created_by where useful. Use numeric/decimal types for currency, never floating-point for stored money. Store currency code (default INR) and define rounding rules.

## 5. Data computation contract
- Daily reports are the source records; business_metrics are derived outputs.
- Do not compute large dashboard metrics on every client render.
- Use a scheduled refresh or transactionally updated derived table/materialized view when appropriate.
- Store metric period, calculation timestamp and metric version.
- Document formulas for revenue, expenses, profit, collection, outstanding, break-even and recovery progress.
- Missing data is not zero. Represent unknown/null distinctly from true zero.
- For existing businesses, self-reported ranges are estimates and must be labeled as such.
- Investment recovery is not shown if the business is marked recovered; do not infer recovered status from incomplete data without an explicit rule.

## 6. Edge Function requirements
### ai-verdict
- Require authenticated caller.
- Resolve allowed business IDs server-side; reject arbitrary unauthorized business IDs.
- Fetch a minimal, precomputed metrics payload.
- Apply calibration gate before LLM call or before publishing a confident verdict.
- Send a versioned prompt and JSON schema to the LLM.
- Validate response against schema; reject malformed output and use a safe error state.
- Persist model/provider, prompt version, metrics timestamp, evidence window, output, confidence and generation timestamp.
- Rate limit and apply budget controls.

### ask-munim
- Authenticate and authorize the selected business.
- Retrieve only the relevant authorized metrics/reports.
- Use retrieval/structured context rather than sending the entire database or unrelated businesses.
- Return a grounded answer plus evidence references (metric names and periods).
- If evidence is missing, state that it cannot determine the answer from current reports.
- Treat user-entered notes as untrusted data, never as instructions to override system policy.
- Avoid returning other tenants' records, prompts, secrets or internal policy.

### generate-report
- Verify the requester can access the selected business IDs and period.
- Generate PDF server-side or via approved provider.
- Embed the confidentiality watermark into PDF content itself.
- Store in private bucket; create authorized, expiring access links.
- Record metadata in generated_reports.

### payment webhook (if applicable)
- Verify provider signature server-side.
- Make processing idempotent using provider event/payment IDs.
- Never trust frontend payment success callbacks alone.
- Record failed, pending, succeeded and refunded states.

## 7. Frontend engineering
- TypeScript strict mode.
- Feature-based components and routes.
- Validate forms on client for UX and again server/database side.
- Every loading, empty, error, success and permission-denied state must be designed.
- Avoid direct database writes for privileged workflows.
- Keep chart implementation to one switchable vertical bar chart.
- Stable business colors should be assigned and persisted or deterministically generated.
- Protect routes for UX, but enforce actual access in RLS/Edge Functions.
- Never rely on hiding a menu item to protect data.

## 8. Secrets and configuration
`.env.example` contains names only, never values. Secrets live in Antigravity's supported secure environment or deployment secret manager and Supabase Edge Function secrets. Rotate any credential accidentally committed. Do not paste production secrets into agent prompts, chat logs or source code.

## 9. Observability
- Structured server logs with request/correlation ID.
- Never log passwords, tokens, full sensitive notes or entire business payloads by default.
- Track AI latency, token/cost estimates, schema-validation failures and fallback counts.
- Track report submission failures, PDF errors and payment webhook failures.
- Alert on repeated authorization failures and unusual request volume.

## 10. Technical decisions requiring confirmation
- Hosting provider and deployment target.
- Email and WhatsApp provider.
- Whether ₹499 consultation is paid in-app or request-only at MVP.
- PDF provider and storage retention.
- Exact financial formulas and whether report fields are cash-basis or accrual-basis.
- Manager invite and password reset mechanism.
- Data retention, account deletion and backup/restore policy.
