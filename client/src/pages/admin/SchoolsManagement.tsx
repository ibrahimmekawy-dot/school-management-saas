import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Plus, Search, Edit, Trash2, Eye, Loader2 } from "lucide-react";
import AddSchoolDialog from "@/components/dialogs/AddSchoolDialog";
import { useSchools } from "@/hooks/useSchools";

export default function SchoolsManagement() {
  const [openDialog, setOpenDialog] = useState(false);
  const { schools, loading, deleteSchool, addSchool } = useSchools();

  const handleAddSchool = async (newSchool: any) => {
    try {
      await addSchool({
        name: newSchool.name,
        city: newSchool.city,
        country: newSchool.country,
        type: newSchool.type,
        principal_name: newSchool.principalName,
        email: newSchool.email,
        phone: newSchool.phone,
        status: "Active",
      } as any);
      setOpenDialog(false);
    } catch (error) {
      console.error("Error adding school:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("هل أنت متأكد من حذف هذه المدرسة؟")) {
      try {
        await deleteSchool(id);
      } catch (error) {
        console.error("Error deleting school:", error);
      }
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Schools Management</h1>
          <p className="text-muted-foreground">Manage all schools in the system</p>
        </div>
        <Button className="gap-2" onClick={() => setOpenDialog(true)}>
          <Plus className="w-4 h-4" />
          Add School
        </Button>
      </div>

      {/* Search & Filters */}
      <Card className="p-4 mb-6">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search schools..." className="pl-10" />
          </div>
          <Button variant="outline">Filters</Button>
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
          ) : schools.length === 0 ? (
            <div className="flex items-center justify-center py-12">
              <p className="text-muted-foreground">لا توجد مدارس حالياً</p>
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="bg-secondary/50 border-b border-border">
                  <th className="px-6 py-3 text-left text-sm font-semibold">School Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">City</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Country</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Type</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {schools.map((school) => (
                  <tr key={school.id} className="border-b border-border hover:bg-secondary/30 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium">{school.name}</td>
                    <td className="px-6 py-4 text-sm">{school.city}</td>
                    <td className="px-6 py-4 text-sm">{school.country}</td>
                    <td className="px-6 py-4 text-sm capitalize">{school.type}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        school.status === "Active" 
                          ? "bg-green-100 text-green-700" 
                          : "bg-gray-100 text-gray-700"
                      }`}>
                        {school.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-destructive"
                          onClick={() => handleDelete(school.id)}
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

      {/* Add School Dialog */}
      <AddSchoolDialog 
        open={openDialog} 
        onOpenChange={setOpenDialog}
        onAdd={handleAddSchool}
      />
    </div>
  );
}
