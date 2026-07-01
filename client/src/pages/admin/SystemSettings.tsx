import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";

export default function SystemSettings() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">System Settings</h1>
      <p className="text-muted-foreground mb-8">Configure system-wide settings and preferences</p>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="branding">Branding</TabsTrigger>
          <TabsTrigger value="languages">Languages</TabsTrigger>
          <TabsTrigger value="activity">Activity Log</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-6">General Settings</h2>
            <div className="space-y-6">
              <div>
                <label className="text-sm font-medium">System Name</label>
                <Input value="School Management System" className="mt-2" />
              </div>
              <div>
                <label className="text-sm font-medium">Support Email</label>
                <Input type="email" value="support@schoolmgmt.edu" className="mt-2" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium">Maintenance Mode</label>
                  <p className="text-xs text-muted-foreground">Enable maintenance mode</p>
                </div>
                <Switch />
              </div>
              <Button>Save Changes</Button>
            </div>
          </Card>
        </TabsContent>

        {/* Branding */}
        <TabsContent value="branding">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-6">Branding</h2>
            <div className="space-y-6">
              <div>
                <label className="text-sm font-medium">Logo URL</label>
                <Input value="https://example.com/logo.png" className="mt-2" />
              </div>
              <div>
                <label className="text-sm font-medium">Primary Color</label>
                <div className="flex gap-2 mt-2">
                  <input type="color" defaultValue="#1e40af" className="w-12 h-10 rounded" />
                </div>
              </div>
              <Button>Save Changes</Button>
            </div>
          </Card>
        </TabsContent>

        {/* Languages */}
        <TabsContent value="languages">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-6">Languages</h2>
            <div className="space-y-4">
              {["English", "Arabic", "French"].map((lang) => (
                <div key={lang} className="flex items-center justify-between p-3 border border-border rounded">
                  <span>{lang}</span>
                  <Switch defaultChecked={lang === "English"} />
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Activity Log */}
        <TabsContent value="activity">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-6">Recent Activities</h2>
            <div className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex gap-3 pb-3 border-b border-border last:border-0">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <p className="text-sm">Admin user updated system settings</p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
