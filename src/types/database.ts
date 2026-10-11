export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type BusinessStartType = 'new' | 'existing';
export type BusinessStatus = 'active' | 'archived';
export type ReportingState = 'submitted' | 'partial' | 'missed';
export type VerdictStatus = 'learning' | 'growing' | 'stable_watch' | 'critical' | 'insufficient_data';
export type AlertSeverity = 'info' | 'watch' | 'critical';
export type PreferredLanguage = 'en' | 'hi';

export interface Profile {
  id: string;
  display_name: string;
  photo_path: string | null;
  phone: string | null;
  preferred_language: PreferredLanguage;
  created_at: string;
  updated_at: string;
}

export interface Business {
  id: string;
  owner_id: string;
  name: string;
  type: string;
  industry: string;
  location: string;
  start_date: string;
  ownership_type: string;
  outlet_count: number;
  description: string | null;
  objective: string | null;
  business_start_type: BusinessStartType;
  investment_recovered: boolean;
  status: BusinessStatus;
  color: string;
  created_at: string;
  updated_at: string;
}

export interface BusinessBaselineSnapshot {
  id: string;
  business_id: string;
  approximate_age: string | null;
  profitability_self_report: string | null;
  monthly_revenue_min: number | null;
  monthly_revenue_max: number | null;
  monthly_expense_min: number | null;
  monthly_expense_max: number | null;
  investment_recovered: boolean;
  problem_area: string | null;
  captured_at: string;
}

export interface BusinessInvestment {
  id: string;
  business_id: string;
  initial_investment: number;
  owner_capital: number;
  additional_investment: number;
  working_capital: number;
  setup_equipment_cost: number;
  deposit_security: number;
  initial_inventory_investment: number;
  monthly_fixed_expenses: number;
  expected_recovery_months: number | null;
  break_even_target_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface BusinessSettings {
  id: string;
  business_id: string;
  reporting_timezone: string;
  cutoff_time: string;
  created_at: string;
  updated_at: string;
}

export interface DailyReport {
  id: string;
  business_id: string;
  submitted_by_manager_id: string;
  report_date: string;
  revenue: number;
  expenses: number;
  cash_collection: number;
  bank_collection: number;
  outstanding_amount: number;
  major_expenses: Json | null;
  operational_issues: string | null;
  notes: string | null;
  completion_state: ReportingState;
  submitted_at: string;
}

export interface BusinessMetrics {
  id: string;
  business_id: string;
  period_start: string;
  period_end: string;
  metric_version: string;
  revenue_total: number;
  expense_total: number;
  profit_estimate: number;
  collection_total: number;
  outstanding_total: number;
  investment_recovery_pct: number | null;
  break_even_status: string | null;
  calculated_at: string;
  data_quality: 'good' | 'limited' | 'insufficient';
}

export interface AIVerdict {
  id: string;
  business_id: string;
  metrics_id: string | null;
  status: VerdictStatus;
  reason: string;
  financial_impact: string;
  recommended_action: string;
  priority: 'high' | 'medium' | 'low';
  confidence: 'high' | 'medium' | 'low';
  evidence_json: Json | null;
  prompt_version: string;
  model_id: string;
  created_at: string;
}
