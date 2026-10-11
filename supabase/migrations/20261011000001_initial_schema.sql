-- Munim Ji — Initial Database Schema & RLS Policies
-- Migration: 20261011000001_initial_schema.sql
-- Covers: profiles, businesses, business_baseline_snapshots, business_investments, business_settings

-- 1. PROFILES
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    display_name TEXT NOT NULL DEFAULT '',
    photo_path TEXT,
    phone TEXT,
    preferred_language TEXT NOT NULL DEFAULT 'en' CHECK (preferred_language IN ('en', 'hi')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own profile"
    ON public.profiles FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
    ON public.profiles FOR INSERT
    WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);

-- 2. BUSINESSES
CREATE TABLE IF NOT EXISTS public.businesses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    owner_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    industry TEXT NOT NULL,
    location TEXT NOT NULL,
    start_date DATE NOT NULL DEFAULT CURRENT_DATE,
    ownership_type TEXT NOT NULL DEFAULT 'sole_proprietorship',
    outlet_count INTEGER NOT NULL DEFAULT 1 CHECK (outlet_count >= 1),
    description TEXT,
    objective TEXT,
    business_start_type TEXT NOT NULL CHECK (business_start_type IN ('new', 'existing')),
    investment_recovered BOOLEAN NOT NULL DEFAULT FALSE,
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'archived')),
    color TEXT NOT NULL DEFAULT '#3B82F6',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_businesses_owner_id ON public.businesses(owner_id);

ALTER TABLE public.businesses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Owners can view own businesses"
    ON public.businesses FOR SELECT
    USING (auth.uid() = owner_id);

CREATE POLICY "Owners can insert own businesses"
    ON public.businesses FOR INSERT
    WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Owners can update own businesses"
    ON public.businesses FOR UPDATE
    USING (auth.uid() = owner_id)
    WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Owners can delete own businesses"
    ON public.businesses FOR DELETE
    USING (auth.uid() = owner_id);

-- 3. BUSINESS BASELINE SNAPSHOTS (For Existing Businesses)
CREATE TABLE IF NOT EXISTS public.business_baseline_snapshots (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    business_id UUID NOT NULL UNIQUE REFERENCES public.businesses(id) ON DELETE CASCADE,
    approximate_age TEXT,
    profitability_self_report TEXT,
    monthly_revenue_min NUMERIC(14,2) CHECK (monthly_revenue_min >= 0),
    monthly_revenue_max NUMERIC(14,2) CHECK (monthly_revenue_max >= 0),
    monthly_expense_min NUMERIC(14,2) CHECK (monthly_expense_min >= 0),
    monthly_expense_max NUMERIC(14,2) CHECK (monthly_expense_max >= 0),
    investment_recovered BOOLEAN NOT NULL DEFAULT FALSE,
    problem_area TEXT,
    captured_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_snapshots_business_id ON public.business_baseline_snapshots(business_id);

ALTER TABLE public.business_baseline_snapshots ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Owners can view own business snapshots"
    ON public.business_baseline_snapshots FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.businesses b
            WHERE b.id = business_baseline_snapshots.business_id
            AND b.owner_id = auth.uid()
        )
    );

CREATE POLICY "Owners can insert own business snapshots"
    ON public.business_baseline_snapshots FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.businesses b
            WHERE b.id = business_baseline_snapshots.business_id
            AND b.owner_id = auth.uid()
        )
    );

CREATE POLICY "Owners can update own business snapshots"
    ON public.business_baseline_snapshots FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM public.businesses b
            WHERE b.id = business_baseline_snapshots.business_id
            AND b.owner_id = auth.uid()
        )
    );

-- 4. BUSINESS INVESTMENTS (For New Businesses)
CREATE TABLE IF NOT EXISTS public.business_investments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    business_id UUID NOT NULL UNIQUE REFERENCES public.businesses(id) ON DELETE CASCADE,
    initial_investment NUMERIC(14,2) NOT NULL DEFAULT 0 CHECK (initial_investment >= 0),
    owner_capital NUMERIC(14,2) NOT NULL DEFAULT 0 CHECK (owner_capital >= 0),
    additional_investment NUMERIC(14,2) NOT NULL DEFAULT 0 CHECK (additional_investment >= 0),
    working_capital NUMERIC(14,2) NOT NULL DEFAULT 0 CHECK (working_capital >= 0),
    setup_equipment_cost NUMERIC(14,2) NOT NULL DEFAULT 0 CHECK (setup_equipment_cost >= 0),
    deposit_security NUMERIC(14,2) NOT NULL DEFAULT 0 CHECK (deposit_security >= 0),
    initial_inventory_investment NUMERIC(14,2) NOT NULL DEFAULT 0 CHECK (initial_inventory_investment >= 0),
    monthly_fixed_expenses NUMERIC(14,2) NOT NULL DEFAULT 0 CHECK (monthly_fixed_expenses >= 0),
    expected_recovery_months INTEGER CHECK (expected_recovery_months > 0),
    break_even_target_date DATE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_investments_business_id ON public.business_investments(business_id);

ALTER TABLE public.business_investments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Owners can view own business investments"
    ON public.business_investments FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.businesses b
            WHERE b.id = business_investments.business_id
            AND b.owner_id = auth.uid()
        )
    );

CREATE POLICY "Owners can insert own business investments"
    ON public.business_investments FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.businesses b
            WHERE b.id = business_investments.business_id
            AND b.owner_id = auth.uid()
        )
    );

CREATE POLICY "Owners can update own business investments"
    ON public.business_investments FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM public.businesses b
            WHERE b.id = business_investments.business_id
            AND b.owner_id = auth.uid()
        )
    );

-- 5. BUSINESS SETTINGS
CREATE TABLE IF NOT EXISTS public.business_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    business_id UUID NOT NULL UNIQUE REFERENCES public.businesses(id) ON DELETE CASCADE,
    reporting_timezone TEXT NOT NULL DEFAULT 'Asia/Kolkata',
    cutoff_time TIME NOT NULL DEFAULT '10:00:00',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_settings_business_id ON public.business_settings(business_id);

ALTER TABLE public.business_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Owners can view own business settings"
    ON public.business_settings FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.businesses b
            WHERE b.id = business_settings.business_id
            AND b.owner_id = auth.uid()
        )
    );

CREATE POLICY "Owners can insert own business settings"
    ON public.business_settings FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.businesses b
            WHERE b.id = business_settings.business_id
            AND b.owner_id = auth.uid()
        )
    );

CREATE POLICY "Owners can update own business settings"
    ON public.business_settings FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM public.businesses b
            WHERE b.id = business_settings.business_id
            AND b.owner_id = auth.uid()
        )
    );

-- 6. AUTOMATIC PROFILE TRIGGER ON AUTH SIGNUP
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, display_name, preferred_language)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', ''),
        COALESCE(NEW.raw_user_meta_data->>'preferred_language', 'en')
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
