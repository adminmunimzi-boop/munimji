# Munim Ji — Release Runbook & Open Decisions

## 1. Environment rules
- Development, staging and production must use separate Supabase projects.
- `.env.example` documents required variable names only.
- Keep production secrets in the deployment secret manager / Supabase Edge Function secrets.
- Never run destructive SQL or migrations against production without explicit human review, backup and rollback plan.
- Use versioned migrations; do not rely on undocumented manual dashboard edits.

## 2. Release sequence
1. Review PR and migration diff.
2. Run lint, typecheck, unit tests, integration tests and production build.
3. Apply migrations to development/staging.
4. Run smoke tests and security suite.
5. Review logs and verify no secrets are exposed.
6. Obtain human approval.
7. Deploy to production using documented process.
8. Run post-deploy smoke tests and monitor error rates.
9. Record version, migration IDs and rollback/mitigation steps.

## 3. Rollback guidance
- Frontend: redeploy last known-good build.
- Database: prefer forward-fix migrations; destructive schema rollback may lose data and must not be automatic.
- Edge Functions: restore prior deployed version where supported.
- Payments: reconcile provider events before any manual correction.
- AI prompts: version prompts so a prior safe version can be restored.

## 4. Decision log — must be resolved before related implementation
1. **Hosting:** Where will the React app be deployed?
2. **Reporting definition:** Is daily revenue recorded on sale date, invoice date or collection date?
3. **Profit definition:** Which expenses count, and how are stock purchases, owner withdrawals, taxes and returns handled?
4. **Outstanding:** Is this end-of-day total outstanding or new credit issued that day?
5. **Recovery formula:** Does investment recovery use cumulative net profit, cash flow, or owner-confirmed recovered status?
6. **Break-even:** Operating break-even or full initial-investment recovery? These are different concepts.
7. **Report cutoff:** What timezone and cutoff time define a missed report?
8. **Manager account creation:** Email invite, phone OTP, or owner-created credentials?
9. **Consultation payment:** Is ₹499 paid inside the app or is the app only recording a callback/WhatsApp request?
10. **PDF provider:** Which provider and retention period?
11. **AI provider/model:** Which provider, model, cost cap and retention policy?
12. **Data retention:** How long are reports, AI conversations and PDFs retained? What happens on account deletion?
13. **Hindi quality:** Who approves business terminology and translated financial definitions?
14. **AI calibration:** Exact minimum days, report count and data-quality threshold for moving from Learning to a verdict?

## 5. Go-live checklist
- [ ] Production project is separate from staging.
- [ ] Backups and restore procedure are tested.
- [ ] RLS review report signed off.
- [ ] Direct API tenant isolation tests pass.
- [ ] Metric formulas approved by product owner.
- [ ] AI calibration and safe fallback verified.
- [ ] Payment webhook verified, if payments enabled.
- [ ] Private storage and signed URL access verified.
- [ ] Watermark embedded in PDF.
- [ ] English/Hindi pass complete.
- [ ] Monitoring and support owner assigned.
- [ ] Privacy notice, terms and consent flows reviewed for launch.
- [ ] Rollback/mitigation plan recorded.
