"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileUp, ChevronLeft, Upload, File } from "lucide-react";

export default function UploadResumePage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);

    // Simulate upload process
    setTimeout(() => {
      setUploading(false);
      setUploadSuccess(true);

      // Reset after showing success message
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    }, 1500);

    // In a real implementation, you would upload the file to your backend/storage
    // const formData = new FormData();
    // formData.append("resume", file);
    // const response = await fetch("/api/upload-resume", {
    //   method: "POST",
    //   body: formData,
    // });
    // if (response.ok) {
    //   setUploading(false);
    //   setUploadSuccess(true);
    //   setTimeout(() => router.push("/dashboard"), 2000);
    // }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-50 to-gray-100 dark:bg-gray-900 dark:from-gray-800 dark:to-gray-700 p-6">
      <div className="max-w-3xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => router.push("/dashboard")}
          className="mb-6 hover:scale-105 transition-transform"
        >
          <ChevronLeft className="h-4 w-4 mr-1" /> Back to Dashboard
        </Button>

        <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <FileUp className="h-6 w-6 text-primary" />
              Upload Your Resume
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-muted-foreground">
              Upload your resume to help us find the best job matches for you.
              We support PDF, DOCX, and TXT formats.
            </p>

            <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 text-center hover:border-primary transition-colors">
              <div className="flex flex-col items-center justify-center space-y-4">
                {file ? (
                  <div className="flex items-center gap-2 text-primary">
                    <File className="h-8 w-8" />
                    <span className="font-medium">{file.name}</span>
                  </div>
                ) : (
                  <Upload className="h-12 w-12 text-gray-400" />
                )}

                <div className="space-y-2">
                  <Label
                    htmlFor="resume-upload"
                    className="cursor-pointer text-primary hover:underline"
                  >
                    {file ? "Change file" : "Select a file"}
                  </Label>
                  <Input
                    id="resume-upload"
                    type="file"
                    accept=".pdf,.docx,.doc,.txt"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <p className="text-xs text-muted-foreground">
                    PDF, DOCX or TXT (max 5MB)
                  </p>
                </div>
              </div>
            </div>

            {uploadSuccess ? (
              <div className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 p-4 rounded-md text-center">
                Resume uploaded successfully! Redirecting to dashboard...
              </div>
            ) : (
              <Button
                onClick={handleUpload}
                disabled={!file || uploading}
                className="w-full hover:scale-105 transition-transform"
              >
                {uploading ? "Uploading..." : "Upload Resume"}
              </Button>
            )}

            <div className="mt-6">
              <h3 className="font-medium mb-2 text-gray-800 dark:text-gray-200">
                Tips for a great resume:
              </h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Keep it concise and relevant to your target jobs</li>
                <li>Highlight your achievements with quantifiable results</li>
                <li>Include relevant keywords from job descriptions</li>
                <li>Proofread carefully for errors</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
