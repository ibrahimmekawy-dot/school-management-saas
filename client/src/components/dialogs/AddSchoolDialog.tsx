import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface AddSchoolDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd?: (school: any) => Promise<void>;
}

export default function AddSchoolDialog({ open, onOpenChange, onAdd }: AddSchoolDialogProps) {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    country: "",
    type: "",
    principalName: "",
    email: "",
    phone: "",
  });

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = "اسم المدرسة مطلوب";
    if (!formData.city.trim()) newErrors.city = "المدينة مطلوبة";
    if (!formData.country.trim()) newErrors.country = "الدولة مطلوبة";
    if (!formData.type) newErrors.type = "نوع المدرسة مطلوب";
    if (!formData.principalName.trim()) newErrors.principalName = "اسم المدير مطلوب";
    if (!formData.email.trim()) newErrors.email = "البريد الإلكتروني مطلوب";
    if (formData.email && !formData.email.includes("@")) newErrors.email = "البريد الإلكتروني غير صحيح";
    if (!formData.phone.trim()) newErrors.phone = "رقم الهاتف مطلوب";

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
      const newSchool = {
        name: formData.name,
        city: formData.city,
        country: formData.country,
        type: formData.type,
        principal_name: formData.principalName,
        email: formData.email,
        phone: formData.phone,
        status: "Active",
      };

      // Call the onAdd callback which should handle Supabase insertion
      if (onAdd) {
        await onAdd(newSchool);
      }
      
      toast.success("تم إضافة المدرسة بنجاح!");
      
      // إعادة تعيين النموذج
      setFormData({
        name: "",
        city: "",
        country: "",
        type: "",
        principalName: "",
        email: "",
        phone: "",
      });
      setErrors({});
      onOpenChange(false);
    } catch (error) {
      console.error("Error adding school:", error);
      const errorMessage = error instanceof Error ? error.message : "حدث خطأ أثناء إضافة المدرسة";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>إضافة مدرسة جديدة</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* اسم المدرسة */}
          <div className="grid gap-2">
            <Label htmlFor="name">اسم المدرسة *</Label>
            <Input
              id="name"
              placeholder="مثال: مدرسة النور"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
          </div>

          {/* المدينة والدولة */}
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="city">المدينة *</Label>
              <Input
                id="city"
                placeholder="الرياض"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className={errors.city ? "border-red-500" : ""}
              />
              {errors.city && <p className="text-xs text-red-500">{errors.city}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="country">الدولة *</Label>
              <Input
                id="country"
                placeholder="السعودية"
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                className={errors.country ? "border-red-500" : ""}
              />
              {errors.country && <p className="text-xs text-red-500">{errors.country}</p>}
            </div>
          </div>

          {/* نوع المدرسة */}
          <div className="grid gap-2">
            <Label htmlFor="type">نوع المدرسة *</Label>
            <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
              <SelectTrigger className={errors.type ? "border-red-500" : ""}>
                <SelectValue placeholder="اختر نوع المدرسة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="government">حكومية</SelectItem>
                <SelectItem value="private">خاصة</SelectItem>
                <SelectItem value="international">دولية</SelectItem>
              </SelectContent>
            </Select>
            {errors.type && <p className="text-xs text-red-500">{errors.type}</p>}
          </div>

          {/* اسم المدير */}
          <div className="grid gap-2">
            <Label htmlFor="principal">اسم المدير *</Label>
            <Input
              id="principal"
              placeholder="أحمد محمد"
              value={formData.principalName}
              onChange={(e) => setFormData({ ...formData, principalName: e.target.value })}
              className={errors.principalName ? "border-red-500" : ""}
            />
            {errors.principalName && <p className="text-xs text-red-500">{errors.principalName}</p>}
          </div>

          {/* البريد الإلكتروني */}
          <div className="grid gap-2">
            <Label htmlFor="email">البريد الإلكتروني *</Label>
            <Input
              id="email"
              type="email"
              placeholder="school@example.com"
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
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
            إلغاء
          </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "جاري الإضافة..." : "إضافة المدرسة"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
