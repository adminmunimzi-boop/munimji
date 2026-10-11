# Munim Ji — Agent Operating Guidelines

This repository follows the **Munim Ji AI Coding Agent Playbook** (`Munim_Ji_Antigravity_Documentation_Pack/04_AI_AGENT_PLAYBOOK_Antigravity.md`).

## Core Rules for All Agents:
1. **Source of Truth:**
   - Security Rules (`05_SECURITY_RLS_THREAT_MODEL.md`)
   - PRD (`01_PRD_Product_Requirements.md`)
   - TRD (`02_TRD_Technical_Requirements.md`)
   - Data Dictionary (`03_DATA_DICTIONARY_AND_METRICS.md`)
   - Decision Log (`docs/DECISIONS.md`)
2. **Deterministic Calculations:** Never let LLMs calculate financial numbers. Calculations must be in Postgres/SQL or deterministic TypeScript functions.
3. **Multi-Tenant Isolation:** Supabase RLS is the non-negotiable security boundary. Never disable RLS or rely on client-side filtering.
4. **Secrets:** Never expose service-role keys or AI API keys in client-side code.
5. **Small Increments:** Build in small vertical slices, test thoroughly, and maintain documentation.
