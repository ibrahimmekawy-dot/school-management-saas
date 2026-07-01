import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Plus, Search, Edit, Trash2, Shield } from "lucide-react";

export default function StaffManagement() {
  const staff = [
    { id: 1, name: "Fatima Al-Dosari", email: "fatima@school.edu", role: "Supervisor", status: "Active" },
    { id: 2, name: "Mohammed Al-Otaibi", email: "mohammed@school.edu", role: "Supervisor", status: "Active" },
    { id: 3, name: "Sarah Al-Shehri", email: "sarah@school.edu", role: "Coordinator", status: "Active" },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Staff Management</h1>
          <p className="text-muted-foreground">Manage school supervisors and coordinators</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Add Staff
        </Button>
      </div>

      {/* Search */}
      <Card className="p-4 mb-6">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search staff..." className="pl-10" />
          </div>
        </div>
      </Card>

      {/* Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-secondary/50 border-b border-border">
                <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Role</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {staff.map((member) => (
                <tr key={member.id} className="border-b border-border hover:bg-secondary/30 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium">{member.name}</td>
                  <td className="px-6 py-4 text-sm">{member.email}</td>
                  <td className="px-6 py-4 text-sm">{member.role}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-700">
                      {member.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Shield className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
