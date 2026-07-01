import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Plus, Trash2, Edit, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ActivityLog() {
  const activities = [
    { id: 1, action: "User Added", user: "Admin", target: "Ahmed Hassan", timestamp: "2 hours ago", type: "create" },
    { id: 2, action: "User Deleted", user: "Admin", target: "Fatima Ibrahim", timestamp: "5 hours ago", type: "delete" },
    { id: 3, action: "Data Imported", user: "Admin", target: "Students (150 records)", timestamp: "1 day ago", type: "import" },
    { id: 4, action: "Settings Updated", user: "Admin", target: "System Configuration", timestamp: "2 days ago", type: "update" },
    { id: 5, action: "File Uploaded", user: "Teacher", target: "Class Results.xlsx", timestamp: "3 days ago", type: "upload" },
  ];

  const getActivityColor = (type: string) => {
    switch (type) {
      case "create":
        return "bg-green-100 text-green-700";
      case "delete":
        return "bg-red-100 text-red-700";
      case "import":
        return "bg-blue-100 text-blue-700";
      case "update":
        return "bg-yellow-100 text-yellow-700";
      case "upload":
        return "bg-purple-100 text-purple-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Activity Log</h1>
          <p className="text-muted-foreground">Track all system activities and changes</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="w-4 h-4" />
          Export
        </Button>
      </div>

      {/* Filters */}
      <Card className="p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search activities..." className="pl-10" />
          </div>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Filter by type..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="create">Create</SelectItem>
              <SelectItem value="delete">Delete</SelectItem>
              <SelectItem value="update">Update</SelectItem>
              <SelectItem value="import">Import</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Filter by user..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Users</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="teacher">Teacher</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Activity List */}
      <div className="space-y-3">
        {activities.map((activity) => (
          <Card key={activity.id} className="p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex gap-4 flex-1">
                <div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getActivityColor(activity.type)}`}>
                    {activity.action}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">
                    {activity.user} {activity.action.toLowerCase()} {activity.target}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">{activity.timestamp}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Edit className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6">
        <p className="text-sm text-muted-foreground">Showing 1-5 of 245 activities</p>
        <div className="flex gap-2">
          <Button variant="outline" disabled>
            Previous
          </Button>
          <Button variant="outline">Next</Button>
        </div>
      </div>
    </div>
  );
}
