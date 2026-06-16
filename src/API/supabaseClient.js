import { createClient } from "@supabase/supabase-js";

const rawSupabaseUrl = process.env.REACT_APP_SUPABASE_URL?.trim();
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY?.trim();

const normalizeSupabaseUrl = (url) => {
  if (!url) return "";

  try {
    const parsed = new URL(url);

    if (!parsed.hostname.endsWith(".supabase.co")) {
      return url;
    }

    return parsed.origin;
  } catch {
    return url;
  }
};

const supabaseUrl = normalizeSupabaseUrl(rawSupabaseUrl);

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export default supabase;
