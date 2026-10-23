-- ========================================================
-- ScamLens AI - Supabase Database Schema
-- Run this script in your Supabase Dashboard -> SQL Editor
-- Project URL: https://kbucpedcafmpaaudqyen.supabase.co
-- ========================================================

-- 1. Create table for Community Scam Reports
CREATE TABLE IF NOT EXISTS public.scam_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_name TEXT NOT NULL,
    scam_category TEXT NOT NULL,
    contact_platform TEXT NOT NULL,
    details TEXT NOT NULL,
    reporter_name TEXT DEFAULT 'Anonymous Student',
    reporter_email TEXT,
    risk_score INTEGER DEFAULT 85,
    status TEXT DEFAULT 'pending_review',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.scam_reports ENABLE ROW LEVEL SECURITY;

-- 3. Policy: Anyone (authenticated or guest) can submit reports
CREATE POLICY "Allow public insert of scam reports"
    ON public.scam_reports
    FOR INSERT
    TO public
    WITH CHECK (true);

-- 4. Policy: Anyone can read published/verified scam reports
CREATE POLICY "Allow public read of scam reports"
    ON public.scam_reports
    FOR SELECT
    TO public
    USING (true);

-- 5. Optional Index for faster category and recency filtering
CREATE INDEX IF NOT EXISTS idx_scam_reports_created_at ON public.scam_reports (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_scam_reports_category ON public.scam_reports (scam_category);
