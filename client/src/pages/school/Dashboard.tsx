import { Users, BookOpen, UserCheck, FolderOpen } from "lucide-react";
import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function SchoolAdminDashboard() {
  const stats = [
    { label: "Total Students", value: "1,234", icon: Users, color: "bg-blue-100 text-blue-600" },
    { label: "Teachers", value: "89", icon: BookOpen, color: "bg-green-100 text-green-600" },
    { label: "Supervisors", value: "12", icon: UserCheck, color: "bg-purple-100 text-purple-600" },
    { label: "Classes", value: "42", icon: FolderOpen, color: "bg-orange-100 text-orange-600" },
  ];

  const chartData = [
    { name: "Mon", students: 1200 },
    { name: "Tue", students: 1300 },
    { name: "Wed", students: 1250 },
    { name: "Thu", students: 1400 },
    { name: "Fri", students: 1350 },
    { name: "Sat", students: 1320 },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">School Dashboard</h1>
      <p className="text-muted-foreground mb-8">Welcome to your school management dashboard</p>

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

      {/* Charts & Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6">
          <h2 className="text-lg font-semibold mb-4">Student Attendance Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="students" stroke="#1e40af" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Latest Activities</h2>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-3 pb-3 border-b border-border last:border-0">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <div>
                  <p className="text-sm">New student enrolled</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
