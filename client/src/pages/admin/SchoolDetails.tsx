import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function SchoolDetails() {
  return (
    <div>
      <Link href="/admin/schools">
        <a className="flex items-center gap-2 text-primary hover:underline mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Schools
        </a>
      </Link>

      <h1 className="text-3xl font-bold mb-6">Al-Noor School</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6">
          <h2 className="text-lg font-semibold mb-4">School Information</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-muted-foreground">School Name</label>
                <p className="font-medium">Al-Noor School</p>
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Type</label>
                <p className="font-medium">Private</p>
              </div>
              <div>
                <label className="text-sm text-muted-foreground">City</label>
                <p className="font-medium">Riyadh</p>
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Country</label>
                <p className="font-medium">Saudi Arabia</p>
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Email</label>
                <p className="font-medium">info@alnoor.edu</p>
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Phone</label>
                <p className="font-medium">+966 11 123 4567</p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Quick Stats</h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Students</p>
              <p className="text-2xl font-bold">1,234</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Teachers</p>
              <p className="text-2xl font-bold">89</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Classes</p>
              <p className="text-2xl font-bold">42</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
