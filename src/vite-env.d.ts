/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL?: string;
  readonly VITE_SUPABASE_ANON_KEY?: string;
  readonly VITE_APP_ENV?: string;
  readonly VITE_DEFAULT_LANGUAGE?: string;
  readonly VITE_REPORTING_TIMEZONE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
