# Munim Ji — Security, RLS & Threat Model
**Status:** Mandatory engineering gate

## 1. Assets to protect
- Owner and manager identities, contact details and sessions.
- Business revenue, expenses, investments, profitability and notes.
- AI questions/conversations and verdicts.
- Consultation contact information and payment references.
- Private PDFs, profile images and integration credentials.

## 2. Primary threats
- Manager from Business A reads Business B records by changing IDs or calling APIs directly.
- Owner guesses another owner's business UUID.
- Unprotected Storage bucket leaks PDFs or profile photos.
- Edge Function trusts client-supplied owner_id/business_id.
- Service-role key or LLM/payment key leaks into frontend or repository.
- Realtime subscription broadcasts rows outside the caller's scope.
- Prompt injection through manager notes or report content.
- Forged/replayed payment webhook or duplicate event.
- Support staff accesses identifiable data without approval/audit.
- AI returns information from another business or presents estimates as verified facts.

## 3. Required controls
- Enable RLS on every tenant-owned table.
- Use restrictive, reviewed policies based on `auth.uid()` and explicit active manager assignments.
- Prefer helper SQL functions only when they are secure, narrowly scoped, and reviewed for `SECURITY DEFINER` risks.
- Test SELECT, INSERT, UPDATE and DELETE policies, including attempted cross-tenant access.
- Verify ownership/assignment server-side in every Edge Function.
- Keep Storage buckets private and authorize object paths through policy; use expiring signed URLs.
- Scope Realtime channels to specific authorized business records.
- Use least-privilege database roles; no client access to privileged secrets.
- Validate all external input; rate limit AI and sensitive workflows.
- Audit role changes, manager reassignment, PDF generation, consultation/payment events and support access.
- Redact logs and avoid storing unnecessary sensitive content.
- Enforce data retention and deletion procedures.

## 4. RLS verification matrix
Create two owners, Owner A and Owner B; two businesses, Business A and Business B; and managers assigned one per business. Test:
1. Owner A reads own business: allowed.
2. Owner A reads Business B by direct REST query: denied/zero rows.
3. Manager A reads assigned Business A reports: allowed as specified.
4. Manager A queries Business B UUID: denied/zero rows.
5. Manager A reads owner-only investments, strategic dashboard, other managers or AI owner conversations: denied.
6. Manager A inserts a report for Business B by forging business_id: denied.
7. Manager assignment revoked: access is immediately denied.
8. Unauthorized user downloads a private PDF by guessing storage path: denied.
9. Realtime listener for Business A receives no Business B updates.
10. Edge Function called with another tenant's business ID: denied.
11. User tries updating owner_id/role/assignment fields: denied unless permitted workflow.
12. SQL and direct API tests pass independently of UI tests.

## 5. Release checkpoint
Before real manager accounts go live, obtain a paid review by an experienced Postgres/Supabase developer. Required deliverable: written confirmation that two test businesses and their managers cannot access each other's data under tested query paths. Fix all high/critical findings and rerun the matrix.

## 6. AI data boundary
- AI receives only the minimum metrics and selected evidence needed.
- No cross-business context unless the authenticated owner explicitly selects multiple businesses they own.
- User-generated text is data, not trusted instruction.
- Validate output against a schema and render as text, not executable HTML.
- Include an insufficient-data response and a safe fallback.
- Keep a record of model, prompt version, metric snapshot and evidence window.
