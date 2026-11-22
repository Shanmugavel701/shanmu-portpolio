/**
 * Authentication Client
 * Manages secure authentication sessions using Supabase JS client.
 */
import { supabase } from "@/utils/supabase/client";

const SESSION_STORAGE_TOKEN = "shanmu_admin_access_token";
const SESSION_STORAGE_USER = "shanmu_admin_user";

export interface SupabaseAuthResponse {
  success: boolean;
  user?: {
    id: string;
    email: string;
    role?: string;
  };
  error?: string;
}

/**
 * Checks whether authentication environment variables are provided
 */
export function isSupabaseConfigured(): boolean {
  const url = import.meta.env["VITE_SUPABASE_URL"] || import.meta.env["NEXT_PUBLIC_SUPABASE_URL"];
  const key = import.meta.env["VITE_SUPABASE_ANON_KEY"] || import.meta.env["NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY"];
  return Boolean(url && key && !url.includes("your-project-id"));
}

/**
 * Sign in admin user with Email and Password
 */
export async function signInWithSupabase(
  email: string,
  password: string,
  rememberMe: boolean = false
): Promise<SupabaseAuthResponse> {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (error) {
      let errorMsg = error.message || "Authentication failed.";
      if (
        errorMsg.toLowerCase().includes("invalid login credentials") ||
        errorMsg.toLowerCase().includes("invalid credentials")
      ) {
        errorMsg = "Invalid email address or password. Please check your credentials.";
      }
      return {
        success: false,
        error: errorMsg,
      };
    }

    if (!data.user || !data.session) {
      return {
        success: false,
        error: "Authentication failed. No active session returned.",
      };
    }

    const user = {
      id: data.user.id,
      email: data.user.email || email.trim(),
      role: data.user.role || "authenticated",
    };

    // Persist session tokens for client state
    if (typeof window !== "undefined") {
      sessionStorage.setItem(SESSION_STORAGE_TOKEN, data.session.access_token);
      sessionStorage.setItem(SESSION_STORAGE_USER, JSON.stringify(user));

      if (rememberMe) {
        localStorage.setItem(SESSION_STORAGE_TOKEN, data.session.access_token);
        localStorage.setItem(SESSION_STORAGE_USER, JSON.stringify(user));
      }
    }

    return {
      success: true,
      user,
    };
  } catch (err: any) {
    console.error("Authentication error:", err);
    return {
      success: false,
      error: "Unable to connect to authentication server. Please check your internet connection.",
    };
  }
}

/**
 * Check if the user currently has an active session
 */
export function getStoredSupabaseUser(): { id: string; email: string; role?: string } | null {
  if (typeof window === "undefined") return null;
  const raw = sessionStorage.getItem(SESSION_STORAGE_USER) || localStorage.getItem(SESSION_STORAGE_USER);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

/**
 * Get active access token for authenticated API requests
 */
export function getStoredSupabaseToken(): string | null {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(SESSION_STORAGE_TOKEN) || localStorage.getItem(SESSION_STORAGE_TOKEN);
}

/**
 * Sign out and clear all session data
 */
export async function signOutSupabase(): Promise<void> {
  if (typeof window === "undefined") return;

  try {
    await supabase.auth.signOut();
  } catch {
    // Ignore network error on logout
  }

  sessionStorage.removeItem(SESSION_STORAGE_TOKEN);
  sessionStorage.removeItem(SESSION_STORAGE_USER);
  localStorage.removeItem(SESSION_STORAGE_TOKEN);
  localStorage.removeItem(SESSION_STORAGE_USER);
}
