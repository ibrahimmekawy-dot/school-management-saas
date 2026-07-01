import { useState, useEffect } from "react";
import { supabase, School } from "@/lib/supabase";
import { toast } from "sonner";

export function useSchools() {
  const [schools, setSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // جلب المدارس من Supabase
  const fetchSchools = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from("schools")
        .select("*")
        .order("created_at", { ascending: false });

      if (fetchError) throw fetchError;

      setSchools(data || []);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to fetch schools";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  // إضافة مدرسة جديدة
  const addSchool = async (schoolData: Omit<School, "id" | "created_at" | "updated_at">) => {
    try {
      const { data, error: insertError } = await supabase
        .from("schools")
        .insert([schoolData])
        .select()
        .single();

      if (insertError) throw insertError;

      setSchools([data, ...schools]);
      toast.success("تم إضافة المدرسة بنجاح!");
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to add school";
      toast.error(message);
      throw err;
    }
  };

  // تحديث مدرسة
  const updateSchool = async (id: string, updates: Partial<School>) => {
    try {
      const { data, error: updateError } = await supabase
        .from("schools")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (updateError) throw updateError;

      setSchools(schools.map(s => s.id === id ? data : s));
      toast.success("تم تحديث المدرسة بنجاح!");
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to update school";
      toast.error(message);
      throw err;
    }
  };

  // حذف مدرسة
  const deleteSchool = async (id: string) => {
    try {
      const { error: deleteError } = await supabase
        .from("schools")
        .delete()
        .eq("id", id);

      if (deleteError) throw deleteError;

      setSchools(schools.filter(s => s.id !== id));
      toast.success("تم حذف المدرسة بنجاح!");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to delete school";
      toast.error(message);
      throw err;
    }
  };

  // جلب البيانات عند التحميل
  useEffect(() => {
    fetchSchools();
  }, []);

  return {
    schools,
    loading,
    error,
    fetchSchools,
    addSchool,
    updateSchool,
    deleteSchool,
  };
}
