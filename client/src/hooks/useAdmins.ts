import { useState, useEffect } from "react";
import { supabase, Admin } from "@/lib/supabase";
import { toast } from "sonner";

export function useAdmins() {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // جلب المسؤولين من Supabase
  const fetchAdmins = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from("admins")
        .select("*")
        .order("created_at", { ascending: false });

      if (fetchError) throw fetchError;

      setAdmins(data || []);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to fetch admins";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  // إضافة مسؤول جديد
  const addAdmin = async (adminData: Omit<Admin, "id" | "created_at" | "updated_at">) => {
    try {
      const { data, error: insertError } = await supabase
        .from("admins")
        .insert([adminData])
        .select()
        .single();

      if (insertError) throw insertError;

      setAdmins([data, ...admins]);
      toast.success("تم إضافة المسؤول بنجاح!");
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to add admin";
      toast.error(message);
      throw err;
    }
  };

  // تحديث مسؤول
  const updateAdmin = async (id: string, updates: Partial<Admin>) => {
    try {
      const { data, error: updateError } = await supabase
        .from("admins")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (updateError) throw updateError;

      setAdmins(admins.map(a => a.id === id ? data : a));
      toast.success("تم تحديث المسؤول بنجاح!");
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to update admin";
      toast.error(message);
      throw err;
    }
  };

  // حذف مسؤول
  const deleteAdmin = async (id: string) => {
    try {
      const { error: deleteError } = await supabase
        .from("admins")
        .delete()
        .eq("id", id);

      if (deleteError) throw deleteError;

      setAdmins(admins.filter(a => a.id !== id));
      toast.success("تم حذف المسؤول بنجاح!");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to delete admin";
      toast.error(message);
      throw err;
    }
  };

  // جلب البيانات عند التحميل
  useEffect(() => {
    fetchAdmins();
  }, []);

  return {
    admins,
    loading,
    error,
    fetchAdmins,
    addAdmin,
    updateAdmin,
    deleteAdmin,
  };
}
