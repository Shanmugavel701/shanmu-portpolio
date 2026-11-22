import { getStoredSupabaseUser, signOutSupabase } from "./supabaseAuth";

const AUTH_STORAGE_KEY = "shanmu_admin_authenticated_session";

export function isAdminAuthenticated(): boolean {
  if (typeof window === "undefined") return false;

  // Check Supabase session first
  if (getStoredSupabaseUser()) {
    return true;
  }

  // Fallback to legacy/local session
  return sessionStorage.getItem(AUTH_STORAGE_KEY) === "true" || localStorage.getItem(AUTH_STORAGE_KEY) === "true";
}

export function setAdminAuthenticated(remember: boolean = false): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(AUTH_STORAGE_KEY, "true");
  if (remember) {
    localStorage.setItem(AUTH_STORAGE_KEY, "true");
  }
}

export function adminLogout(): void {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(AUTH_STORAGE_KEY);
  localStorage.removeItem(AUTH_STORAGE_KEY);
  signOutSupabase();
}
