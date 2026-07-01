import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Plus, Search, Edit, Trash2 } from "lucide-react";

export default function TeachersManagement() {
  const teachers = [
    { id: 1, name: "Dr. Ahmed Hassan", email: "ahmed.hassan@school.edu", subject: "Mathematics", classes: "4", status: "Active" },
    { id: 2, name: "Ms. Layla Ibrahim", email: "layla.ibrahim@school.edu", subject: "English", classes: "3", status: "Active" },
    { id: 3, name: "Mr. Khalid Saleh", email: "khalid.saleh@school.edu", subject: "Science", classes: "5", status: "Active" },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Teachers Management</h1>
          <p className="text-muted-foreground">Manage school teachers and their assignments</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Add Teacher
        </Button>
      </div>

      {/* Search & Filters */}
      <Card className="p-4 mb-6">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search teachers..." className="pl-10" />
          </div>
          <Button variant="outline">Filters</Button>
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
                <th className="px-6 py-3 text-left text-sm font-semibold">Subject</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Classes</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((teacher) => (
                <tr key={teacher.id} className="border-b border-border hover:bg-secondary/30 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium">{teacher.name}</td>
                  <td className="px-6 py-4 text-sm">{teacher.email}</td>
                  <td className="px-6 py-4 text-sm">{teacher.subject}</td>
                  <td className="px-6 py-4 text-sm">{teacher.classes}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-700">
                      {teacher.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex gap-2">
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
