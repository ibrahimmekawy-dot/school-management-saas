import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: "admin" | "coordinator" | "teacher" | "super_admin";
  school_id?: string;
  schoolName?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  // التحقق من بيانات المستخدم المحفوظة عند تحميل التطبيق
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      setLoading(true);
      const savedUser = localStorage.getItem("auth_user");
      const sessionToken = localStorage.getItem("session_token");

      if (savedUser && sessionToken) {
        const userData = JSON.parse(savedUser);
        setUser(userData);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Error checking auth:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);

      // البحث عن المسؤول في قاعدة البيانات
      const { data: admins, error: adminError } = await supabase
        .from("admins")
        .select("id, name, email, phone, role, school_id, status")
        .eq("email", email)
        .single();

      if (adminError || !admins) {
        throw new Error("البريد الإلكتروني أو كلمة المرور غير صحيحة");
      }

      if (admins.status === "Inactive") {
        throw new Error("حسابك معطل. يرجى التواصل مع المسؤول");
      }

      // جلب بيانات المدرسة
      let schoolName = "";
      if (admins.school_id) {
        const { data: school } = await supabase
          .from("schools")
          .select("name")
          .eq("id", admins.school_id)
          .single();

        schoolName = school?.name || "";
      }

      // إنشاء بيانات المستخدم
      const userData: AuthUser = {
        id: admins.id,
        email: admins.email,
        name: admins.name,
        role: admins.role as "admin" | "coordinator" | "teacher",
        school_id: admins.school_id,
        schoolName: schoolName,
      };

      // حفظ بيانات المستخدم والجلسة
      const sessionToken = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem("auth_user", JSON.stringify(userData));
      localStorage.setItem("session_token", sessionToken);

      setUser(userData);
      toast.success("تم تسجيل الدخول بنجاح!");
    } catch (error) {
      const message = error instanceof Error ? error.message : "فشل تسجيل الدخول";
      toast.error(message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      localStorage.removeItem("auth_user");
      localStorage.removeItem("session_token");
      setUser(null);
      toast.success("تم تسجيل الخروج بنجاح!");
    } catch (error) {
      const message = error instanceof Error ? error.message : "فشل تسجيل الخروج";
      toast.error(message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        login,
        logout,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
