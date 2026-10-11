# Munim Ji — Data Dictionary & Metrics Contract
**Version:** 1.0 | **Status:** Proposed schema contract; review before migrations

## 1. Data design rules
- Use UUID primary keys, timestamptz timestamps, foreign keys and explicit enums/check constraints.
- Currency values use NUMERIC(14,2) or an equivalent fixed-precision type; never float/double.
- Keep source facts separate from calculated metrics.
- Use nullable values for unknown; never silently substitute zero.
- Every tenant-owned row must be reachable through an owner/business authorization path.
- Include created_at, updated_at where appropriate and audit events for security-sensitive changes.

## 2. Entity outline
| Table | Purpose | Important fields (proposed) |
|---|---|---|
| profiles | User profile and preferences | id = auth.users.id, display_name, photo_path, preferred_language, created_at |
| businesses | Business identity | id, owner_id, name, type, industry, location, start_date, ownership_type, outlet_count, objective, business_start_type, investment_recovered, status |
| business_baseline_snapshots | Existing-business snapshot | id, business_id unique, approximate_age, profitability_self_report, monthly_revenue_min/max, monthly_expense_min/max, investment_recovered, problem_area, captured_at |
| business_investments | Starting capital breakdown | id, business_id, initial_investment, owner_capital, additional_investment, working_capital, setup_equipment_cost, deposit_security, initial_inventory_investment, monthly_fixed_expenses, expected_recovery_months, break_even_target_date |
| business_managers | Manager identity/profile | id, auth_user_id, display_name, email/phone as needed, status |
| manager_assignments | Manager-to-business permissions | id, manager_id, business_id, assigned_by, active, assigned_at, revoked_at |
| business_settings | Reporting configuration | business_id, reporting_timezone, cutoff_time, required_fields/config |
| daily_reports | Manager submitted daily data | id, business_id, submitted_by_manager_id, report_date, revenue, expenses, cash_collection, bank_collection, outstanding_amount, major_expenses JSON/child table, operational_issues, notes, completion_state, submitted_at |
| reporting_calendar | Calendar state per business/date | id, business_id, report_date, state (submitted/partial/missed), daily_report_id nullable |
| business_metrics | Derived metrics snapshot | id, business_id, period_start, period_end, metric_version, revenue_total, expense_total, profit_estimate, collection_total, outstanding_total, investment_recovery_pct nullable, break_even_status nullable, calculated_at, data_quality |
| business_history | Timeline events | id, business_id, event_type, title, description, event_date, created_by |
| alerts | Business risk/action alerts | id, business_id, alert_type, severity, evidence_json, financial_impact, recommendation, status, created_at, resolved_at |
| notifications | User notifications | id, user_id, business_id nullable, alert_id nullable, title, body, read_at, created_at |
| ai_verdicts | Structured AI verdict history | id, business_id, metrics_id, status, reason, financial_impact, recommended_action, priority, confidence, evidence_json, prompt_version, model_id, created_at |
| ai_conversations | Ask Munim Ji records | id, owner_id, business_id, question, answer, evidence_json, model_id, prompt_version, created_at |
| consultancy_requests | ₹499 request workflow | id, owner_id, business_id nullable, contact_method, contact_value, consent_at, payment_status, payment_reference, request_status, created_at |
| generated_reports | PDF metadata | id, owner_id, report_scope, business_ids, period_start/end, storage_path, watermark_version, generated_at |
| audit_logs | Sensitive action audit | id, actor_user_id, action, target_type, target_id, business_id nullable, metadata_redacted, created_at |
| payment_events | Payment provider events | id, provider, provider_event_id unique, payment_reference, status, processed_at, payload_hash |

## 3. Recommended enums
- business_start_type: `new`, `existing`
- business_status: `active`, `archived`
- reporting_state: `submitted`, `partial`, `missed`
- verdict_status: `learning`, `growing`, `stable_watch`, `critical`, `insufficient_data`, `error`
- alert_severity: `info`, `watch`, `critical`
- consultation_payment_status: `not_required`, `pending`, `succeeded`, `failed`, `refunded`
- consultation_request_status: `new`, `contacted`, `scheduled`, `completed`, `cancelled`

## 4. Metric definitions to finalize
The PRD establishes that the app tracks revenue/profit, cash/bank collection, outstanding amounts, investment recovery and break-even. It does not define exact accounting formulas. These must be approved before the AI is allowed to interpret them.

| Metric | Proposed definition | Important caveat |
|---|---|---|
| Revenue | Sum of report revenue over selected period | Decide gross/net, returns, taxes and sales date policy |
| Expenses | Sum of report expenses over selected period | Define whether owner withdrawals/depreciation/stock purchases count |
| Profit estimate | Revenue − expenses for same period | Label as estimate; not statutory accounting profit |
| Collections | Cash collection + bank collection | Avoid double-counting transfers between cash and bank |
| Outstanding | Reported outstanding balance | Decide whether reports enter end-of-day balance or new dues |
| Investment recovery % | Approved formula based on initial investment and cumulative eligible profit/cash flow | Must not be calculated without reliable baseline; hide if marked recovered |
| Break-even progress | Actual progress vs approved target using agreed formula | Clarify operating break-even vs recovery of initial capital |
| Report completeness | Required fields supplied / required fields expected | Missing values should be distinct from zero |

## 5. Business data quality
Each metric snapshot should carry a data-quality state such as `good`, `limited`, `low`, or `insufficient`, with explicit rules. Data quality should consider number of reports, missing days, inconsistent values and whether figures are estimates. Do not turn low-quality data into a confident AI verdict.

## 6. Daily report validation
- Amounts must be non-negative unless a specific field explicitly permits negative adjustments.
- Require a report date within an allowed window; late submission must be marked.
- Prevent duplicate active reports for the same business/date unless edits/versioning are intentionally supported.
- Preserve edit history or audit significant corrections.
- Use a business timezone, not a hard-coded browser timezone.
- Explain what “revenue”, “expenses”, “collection” and “outstanding” mean in the form.
