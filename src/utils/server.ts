import { type CookieOptions, createServerClient } from "@supabase/ssr";

export function createClient(
  getCookie: (name: string) => string | undefined,
  setCookie: (name: string, value: string, options: CookieOptions) => void,
  removeCookie: (name: string, options: CookieOptions) => void,
) {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: getCookie,
        set: setCookie,
        remove: removeCookie,
      },
    },
  );
}
