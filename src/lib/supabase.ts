import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Booking, Cleaner, ServicePackage, SupabaseConfigState } from '../types';

const STORAGE_KEY = 'tcs_supabase_config';

export function getStoredSupabaseConfig(): SupabaseConfigState {
  const envUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://answqbxnxccdnhatgegt.supabase.co';
  const envKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_fvzZeSOVsJwusbZ03txyKQ_HVLixahC';

  // Check localStorage overrides
  let savedConfig: Partial<SupabaseConfigState> = {};
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      savedConfig = JSON.parse(saved);
    }
  } catch (e) {
    console.warn('Failed to parse saved Supabase config:', e);
  }

  const finalUrl = savedConfig.url || envUrl;
  const finalKey = savedConfig.anonKey || envKey;

  return {
    url: finalUrl,
    anonKey: finalKey,
    isConnected: Boolean(finalUrl && finalKey),
    lastConnectedAt: savedConfig.lastConnectedAt || (Boolean(finalUrl && finalKey) ? new Date().toISOString() : undefined),
  };
}

export function saveSupabaseConfig(config: SupabaseConfigState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  } catch (e) {
    console.error('Failed to save Supabase config:', e);
  }
}

let supabaseInstance: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient | null {
  const config = getStoredSupabaseConfig();
  if (!config.url || !config.anonKey) {
    return null;
  }

  if (!supabaseInstance) {
    try {
      supabaseInstance = createClient(config.url, config.anonKey);
    } catch (e) {
      console.error('Failed to instantiate Supabase client:', e);
      return null;
    }
  }
  return supabaseInstance;
}

export function resetSupabaseClient() {
  supabaseInstance = null;
}

export async function testSupabaseConnection(url: string, key: string): Promise<{ success: boolean; message: string }> {
  if (!url || !key) {
    return { success: false, message: 'URL and Anon Key are required.' };
  }

  try {
    const tempClient = createClient(url, key);
    // Simple light call to check if credentials are valid
    const { error } = await tempClient.from('bookings').select('id').limit(1);
    
    // If the table doesn't exist yet, it will return error 42P01 (relation does not exist) or 200/empty
    if (error && error.code !== 'PGRST301' && error.code !== '42P01') {
      // If code is invalid API key or bad URL
      if (error.message.includes('apiKey') || error.message.includes('JWT') || error.message.includes('fetch failed')) {
        return { success: false, message: `Connection failed: ${error.message}` };
      }
    }

    return {
      success: true,
      message: 'Successfully connected to Supabase project!',
    };
  } catch (err: any) {
    return { success: false, message: err.message || 'Network error connecting to Supabase.' };
  }
}

// SQL Generator string for user's Supabase project setup
export const SUPABASE_SQL_SCHEMA = `-- Ture Cleaning Services (TCS) Database Schema
-- Run this script in your Supabase SQL Editor (https://supabase.com/dashboard/project/_/sql)

-- 1. Create Bookings Table
CREATE TABLE IF NOT EXISTS public.bookings (
  id TEXT PRIMARY KEY,
  customer_name TEXT NOT NULL,
  customer_phone TEXT,
  customer_email TEXT,
  service_type TEXT NOT NULL,
  category TEXT NOT NULL,
  address TEXT NOT NULL,
  date DATE NOT NULL,
  time_slot TEXT NOT NULL,
  duration_hours NUMERIC DEFAULT 2,
  status TEXT NOT NULL DEFAULT 'Pending',
  price NUMERIC NOT NULL,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create Cleaners Table
CREATE TABLE IF NOT EXISTS public.cleaners (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  avatar TEXT,
  role TEXT,
  status TEXT DEFAULT 'On Duty',
  current_task TEXT,
  location TEXT,
  gps_distance TEXT,
  phone TEXT,
  email TEXT,
  rating NUMERIC DEFAULT 5.0,
  completed_jobs INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create Services Table
CREATE TABLE IF NOT EXISTS public.services (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  short_desc TEXT,
  description TEXT,
  duration TEXT,
  price NUMERIC NOT NULL,
  price_type TEXT,
  popular BOOLEAN DEFAULT false,
  image TEXT,
  features TEXT[]
);

-- Enable Row Level Security (RLS) & Public Read/Write Policies for Dev
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cleaners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read/write on bookings" ON public.bookings FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read/write on cleaners" ON public.cleaners FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read/write on services" ON public.services FOR ALL USING (true) WITH CHECK (true);
`;
