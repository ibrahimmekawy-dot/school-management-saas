import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, File, CheckCircle, AlertCircle } from "lucide-react";
import { useState } from "react";

export default function DataImport() {
  const [dataType, setDataType] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      setFile(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Data Import</h1>
      <p className="text-muted-foreground mb-8">Import student, teacher, and other data from Excel or CSV files</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upload Section */}
        <Card className="lg:col-span-2 p-6">
          <h2 className="text-lg font-semibold mb-6">Upload Data</h2>

          {/* Data Type Selection */}
          <div className="mb-6">
            <label className="text-sm font-medium mb-2 block">Select Data Type</label>
            <Select value={dataType} onValueChange={setDataType}>
              <SelectTrigger>
                <SelectValue placeholder="Choose data type..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="students">Students</SelectItem>
                <SelectItem value="teachers">Teachers</SelectItem>
                <SelectItem value="results">Results</SelectItem>
                <SelectItem value="classes">Classes</SelectItem>
                <SelectItem value="grades">Grades</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Drag & Drop Area */}
          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            className="border-2 border-dashed border-border rounded-lg p-12 text-center hover:border-primary transition-colors cursor-pointer"
          >
            <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-sm font-medium mb-2">Drag and drop your file here</p>
            <p className="text-xs text-muted-foreground mb-4">or</p>
            <label>
              <Input
                type="file"
                accept=".xlsx,.csv,.xls"
                onChange={handleFileSelect}
                className="hidden"
              />
              <Button variant="outline" asChild>
                <span>Browse Files</span>
              </Button>
            </label>
          </div>

          {/* File Info */}
          {file && (
            <Card className="mt-6 p-4 bg-secondary/50">
              <div className="flex items-start gap-3">
                <File className="w-5 h-5 text-primary mt-1" />
                <div className="flex-1">
                  <p className="font-medium text-sm">{file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {(file.size / 1024).toFixed(2)} KB
                  </p>
                </div>
              </div>
            </Card>
          )}

          {/* Preview Table */}
          {file && (
            <div className="mt-6">
              <h3 className="font-medium mb-3">Preview</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-secondary/50">
                      <th className="px-4 py-2 text-left">ID</th>
                      <th className="px-4 py-2 text-left">Name</th>
                      <th className="px-4 py-2 text-left">Email</th>
                      <th className="px-4 py-2 text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[1, 2, 3].map((i) => (
                      <tr key={i} className="border-b border-border">
                        <td className="px-4 py-2">STU{1000 + i}</td>
                        <td className="px-4 py-2">Student {i}</td>
                        <td className="px-4 py-2">student{i}@school.edu</td>
                        <td className="px-4 py-2">
                          <span className="px-2 py-1 rounded text-xs bg-green-100 text-green-700">Valid</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          {file && (
            <div className="flex gap-3 mt-6">
              <Button className="flex-1">Import Data</Button>
              <Button variant="outline" onClick={() => setFile(null)}>
                Cancel
              </Button>
            </div>
          )}
        </Card>

        {/* Info Section */}
        <div className="space-y-4">
          <Card className="p-4">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              Supported Formats
            </h3>
            <ul className="text-sm space-y-2 text-muted-foreground">
              <li>• Excel (.xlsx, .xls)</li>
              <li>• CSV (.csv)</li>
              <li>• Google Sheets</li>
            </ul>
          </Card>

          <Card className="p-4">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-orange-600" />
              Requirements
            </h3>
            <ul className="text-sm space-y-2 text-muted-foreground">
              <li>• File size max 10MB</li>
              <li>• First row must be headers</li>
              <li>• Required columns: Name, Email</li>
            </ul>
          </Card>

          <Card className="p-4">
            <h3 className="font-semibold mb-3">Recent Imports</h3>
            <div className="space-y-2 text-sm">
              {[1, 2].map((i) => (
                <div key={i} className="flex items-center justify-between pb-2 border-b border-border last:border-0">
                  <span className="text-muted-foreground">Students Import</span>
                  <span className="text-xs text-green-600">Success</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
