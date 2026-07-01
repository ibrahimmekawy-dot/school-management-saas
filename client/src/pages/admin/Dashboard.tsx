import { BarChart3, Users, Building2, UserCheck } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function SuperAdminDashboard() {
  const stats = [
    { label: "Total Schools", value: "24", icon: Building2, color: "bg-blue-100 text-blue-600" },
    { label: "Total Users", value: "1,234", icon: Users, color: "bg-green-100 text-green-600" },
    { label: "School Admins", value: "48", icon: UserCheck, color: "bg-purple-100 text-purple-600" },
    { label: "Teachers", value: "892", icon: Users, color: "bg-orange-100 text-orange-600" },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Super Admin Dashboard</h1>
      <p className="text-muted-foreground mb-8">Welcome back! Here's your system overview.</p>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <Card key={stat.label} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-3xl font-bold mt-2">{stat.value}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Schools</h2>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between pb-3 border-b border-border last:border-0">
                <div>
                  <p className="font-medium">School {i}</p>
                  <p className="text-sm text-muted-foreground">Added 2 days ago</p>
                </div>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Active</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Latest Activities</h2>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-3 pb-3 border-b border-border last:border-0">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <div>
                  <p className="text-sm">School Admin added new teacher</p>
                  <p className="text-xs text-muted-foreground">5 minutes ago</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
