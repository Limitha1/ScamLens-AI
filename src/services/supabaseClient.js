import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://kbucpedcafmpaaudqyen.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey && supabaseAnonKey.trim() !== '');

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true
      }
    })
  : null;

/**
 * Save reported scam into Supabase `scam_reports` table
 */
export async function submitScamReportToSupabase(reportData) {
  if (!isSupabaseConfigured || !supabase) {
    console.info('Supabase Anon Key not set yet. Storing report in local state.');
    return { success: true, localOnly: true };
  }

  try {
    const { data, error } = await supabase
      .from('scam_reports')
      .insert([
        {
          company_name: reportData.companyName,
          scam_category: reportData.scamType,
          contact_platform: reportData.contactSource,
          details: reportData.details,
          reporter_name: reportData.isAnonymous ? 'Anonymous Student' : reportData.reporterName,
          reporter_email: reportData.isAnonymous ? null : reportData.reporterEmail,
          created_at: new Date().toISOString()
        }
      ])
      .select();

    if (error) {
      console.warn('Supabase insert failed:', error.message);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (err) {
    console.error('Error submitting scam report to Supabase:', err);
    return { success: false, error: err.message };
  }
}

/**
 * Fetch latest community reported scams from Supabase
 */
export async function getCommunityScamReports() {
  if (!isSupabaseConfigured || !supabase) {
    return { success: true, data: [] };
  }

  try {
    const { data, error } = await supabase
      .from('scam_reports')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(20);

    if (error) {
      console.warn('Error fetching scam reports from Supabase:', error.message);
      return { success: false, error: error.message, data: [] };
    }

    return { success: true, data };
  } catch (err) {
    console.error('Error getting community scam reports:', err);
    return { success: false, error: err.message, data: [] };
  }
}
