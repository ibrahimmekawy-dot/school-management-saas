import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface AddAdminDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd?: (admin: any) => Promise<void>;
  schools?: any[];
}

export default function AddAdminDialog({ open, onOpenChange, onAdd, schools = [] }: AddAdminDialogProps) {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    school: "",
    role: "admin",
  });

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = "الاسم مطلوب";
    if (!formData.email.trim()) newErrors.email = "البريد الإلكتروني مطلوب";
    if (formData.email && !formData.email.includes("@")) newErrors.email = "البريد الإلكتروني غير صحيح";
    if (!formData.phone.trim()) newErrors.phone = "رقم الهاتف مطلوب";
    if (!formData.password.trim()) newErrors.password = "كلمة المرور مطلوبة";
    if (formData.password.length < 6) newErrors.password = "كلمة المرور يجب أن تكون 6 أحرف على الأقل";
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "كلمات المرور غير متطابقة";
    if (!formData.school.trim()) newErrors.school = "المدرسة مطلوبة";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      toast.error("يرجى ملء جميع الحقول بشكل صحيح");
      return;
    }

    setLoading(true);
    try {
      const newAdmin = {
        school: formData.school,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        role: formData.role,
        status: "Active",
      };

      if (onAdd) {
        await onAdd(newAdmin);
      }

      toast.success("تم إضافة المسؤول بنجاح!");
      
      setFormData({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        school: "",
        role: "admin",
      });
      setErrors({});
      onOpenChange(false);
    } catch (error) {
      console.error("Error adding admin:", error);
      const errorMessage = error instanceof Error ? error.message : "حدث خطأ أثناء إضافة المسؤول";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>إضافة مسؤول مدرسة جديد</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* الاسم */}
          <div className="grid gap-2">
            <Label htmlFor="name">الاسم الكامل *</Label>
            <Input
              id="name"
              placeholder="أحمد محمد علي"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
          </div>

          {/* البريد الإلكتروني */}
          <div className="grid gap-2">
            <Label htmlFor="email">البريد الإلكتروني *</Label>
            <Input
              id="email"
              type="email"
              placeholder="admin@school.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
          </div>

          {/* رقم الهاتف */}
          <div className="grid gap-2">
            <Label htmlFor="phone">رقم الهاتف *</Label>
            <Input
              id="phone"
              placeholder="+966501234567"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className={errors.phone ? "border-red-500" : ""}
            />
            {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
          </div>

          {/* كلمة المرور */}
          <div className="grid gap-2">
            <Label htmlFor="password">كلمة المرور *</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className={errors.password ? "border-red-500" : ""}
            />
            {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
          </div>

          {/* تأكيد كلمة المرور */}
          <div className="grid gap-2">
            <Label htmlFor="confirmPassword">تأكيد كلمة المرور *</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              className={errors.confirmPassword ? "border-red-500" : ""}
            />
            {errors.confirmPassword && <p className="text-xs text-red-500">{errors.confirmPassword}</p>}
          </div>

          {/* المدرسة */}
          <div className="grid gap-2">
            <Label htmlFor="school">المدرسة *</Label>
            <Select value={formData.school} onValueChange={(value) => setFormData({ ...formData, school: value })}>
              <SelectTrigger className={errors.school ? "border-red-500" : ""}>
                <SelectValue placeholder="اختر المدرسة" />
              </SelectTrigger>
              <SelectContent>
                {schools.length > 0 ? (
                  schools.map((school) => (
                    <SelectItem key={school.id} value={school.id}>
                      {school.name}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="none" disabled>
                    لا توجد مدارس
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
            {errors.school && <p className="text-xs text-red-500">{errors.school}</p>}
          </div>

          {/* الدور */}
          <div className="grid gap-2">
            <Label htmlFor="role">الدور</Label>
            <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">مسؤول المدرسة</SelectItem>
                <SelectItem value="coordinator">منسق</SelectItem>
                <SelectItem value="teacher">معلم</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
            إلغاء
          </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "جاري الإضافة..." : "إضافة المسؤول"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
