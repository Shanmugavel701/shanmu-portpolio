import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  (import.meta.env["VITE_SUPABASE_URL"] as string) ||
  (import.meta.env["NEXT_PUBLIC_SUPABASE_URL"] as string) ||
  "https://vbvcqjcpdngfhvbvecfh.supabase.co";

const supabaseKey =
  (import.meta.env["VITE_SUPABASE_ANON_KEY"] as string) ||
  (import.meta.env["NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY"] as string) ||
  "sb_publishable_k-7VfgMWWIZruiKYzEVjuw_lj04r-V6";

export const createSupabaseClient = () => createClient(supabaseUrl, supabaseKey);
export const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;

