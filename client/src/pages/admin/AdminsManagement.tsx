import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Plus, Search, Edit, Trash2, ToggleRight, Loader2 } from "lucide-react";
import AddAdminDialog from "@/components/dialogs/AddAdminDialog";
import { useAdmins } from "@/hooks/useAdmins";
import { useSchools } from "@/hooks/useSchools";

export default function AdminsManagement() {
  const [openDialog, setOpenDialog] = useState(false);
  const { admins, loading, deleteAdmin, addAdmin, updateAdmin } = useAdmins();
  const { schools } = useSchools();

  const getSchoolName = (schoolId: string) => {
    const school = schools.find(s => s.id === schoolId);
    return school?.name || "Unknown School";
  };

  const handleAddAdmin = async (newAdmin: any) => {
    try {
      await addAdmin({
        school_id: newAdmin.school,
        name: newAdmin.name,
        email: newAdmin.email,
        phone: newAdmin.phone,
        role: newAdmin.role || "admin",
        status: "Active",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      } as any);
      setOpenDialog(false);
    } catch (error) {
      console.error("Error adding admin:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("هل أنت متأكد من حذف هذا المسؤول؟")) {
      try {
        await deleteAdmin(id);
      } catch (error) {
        console.error("Error deleting admin:", error);
      }
    }
  };

  const handleToggleStatus = async (id: string, currentStatus: string) => {
    try {
      await updateAdmin(id, {
        status: currentStatus === "Active" ? "Inactive" : "Active",
      });
    } catch (error) {
      console.error("Error updating admin:", error);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">School Admins Management</h1>
          <p className="text-muted-foreground">Manage school administrators</p>
        </div>
        <Button className="gap-2" onClick={() => setOpenDialog(true)}>
          <Plus className="w-4 h-4" />
          Add Admin
        </Button>
      </div>

      {/* Search */}
      <Card className="p-4 mb-6">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search admins..." className="pl-10" />
          </div>
        </div>
      </Card>

      {/* Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
              <span className="ml-2 text-muted-foreground">جاري تحميل البيانات...</span>
            </div>
          ) : admins.length === 0 ? (
            <div className="flex items-center justify-center py-12">
              <p className="text-muted-foreground">لا يوجد مسؤولون حالياً</p>
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="bg-secondary/50 border-b border-border">
                  <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">School</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {admins.map((admin) => (
                  <tr key={admin.id} className="border-b border-border hover:bg-secondary/30 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium">{admin.name}</td>
                    <td className="px-6 py-4 text-sm">{admin.email}</td>
                    <td className="px-6 py-4 text-sm">{getSchoolName(admin.school_id)}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        admin.status === "Active" 
                          ? "bg-green-100 text-green-700" 
                          : "bg-gray-100 text-gray-700"
                      }`}>
                        {admin.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => handleToggleStatus(admin.id, admin.status)}
                        >
                          <ToggleRight className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-destructive"
                          onClick={() => handleDelete(admin.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </Card>

      {/* Add Admin Dialog */}
      <AddAdminDialog 
        open={openDialog} 
        onOpenChange={setOpenDialog}
        onAdd={handleAddAdmin}
        schools={schools}
      />
    </div>
  );
}
