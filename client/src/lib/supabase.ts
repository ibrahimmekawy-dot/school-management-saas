import { createClient } from "@supabase/supabase-js";

// استخدم متغيرات البيئة
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// أنواع البيانات
export interface School {
  id: string;
  name: string;
  city: string;
  country: string;
  type: "government" | "private" | "international";
  principal_name: string;
  email: string;
  phone: string;
  status: "Active" | "Inactive";
  created_at: string;
  updated_at: string;
}

export interface Admin {
  id: string;
  school_id: string;
  name: string;
  email: string;
  phone: string;
  role: "admin" | "coordinator" | "teacher";
  status: "Active" | "Inactive";
  created_at: string;
  updated_at: string;
}

export interface Student {
  id: string;
  school_id: string;
  name: string;
  email: string;
  phone: string;
  class: string;
  status: "Active" | "Inactive";
  created_at: string;
  updated_at: string;
}

export interface Teacher {
  id: string;
  school_id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  status: "Active" | "Inactive";
  created_at: string;
  updated_at: string;
}
