'use client';

import { useState } from 'react';
import { UploadCloud, File, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const FileUploader = ({ title, onFileSelect }: { title: string, onFileSelect: (file: File | null) => void }) => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
      onFileSelect(e.dataTransfer.files[0]);
    }
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      onFileSelect(e.target.files[0]);
    }
  };
  
  const removeFile = () => {
    setFile(null);
    onFileSelect(null);
  };

  if (file) {
    return (
      <div className="w-full">
        <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/20">
            <div className="flex items-center gap-3">
              <File className="h-6 w-6 text-primary" />
              <div className="flex flex-col">
                <span className="text-sm font-medium">{file.name}</span>
                <span className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(2)} KB</span>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={removeFile}>
              <X className="h-4 w-4" />
            </Button>
        </div>
        <Progress value={100} className="h-1 mt-2" />
      </div>
    );
  }

  return (
    <label
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className={`flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-2xl cursor-pointer transition-colors ${isDragging ? 'border-primary' : 'border-border/50'} glassmorphism-card-inset`}
    >
      <div className="flex flex-col items-center justify-center pt-5 pb-6">
        <UploadCloud className="w-8 h-8 mb-4 text-muted-foreground" />
        <p className="mb-2 text-sm text-muted-foreground">
          <span className="font-semibold text-primary">Click to upload</span> or drag and drop
        </p>
        <p className="text-xs text-muted-foreground">{title} (PDF, TXT, DOCX)</p>
      </div>
      <input type="file" className="hidden" onChange={handleFileChange} accept=".pdf,.txt,.docx" />
    </label>
  );
};

export default function UploadPage() {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [jdFile, setJdFile] = useState<File | null>(null);

  const handleAnalyze = () => {
    // Logic to handle file analysis with GenAI
    console.log("Analyzing:", { resumeFile, jdFile });
  };

  return (
    <div className="container mx-auto py-8">
      <Card className="glassmorphism-card rounded-2xl">
        <CardHeader>
          <CardTitle>Upload Documents</CardTitle>
          <CardDescription>
            Upload your resume and a job description to get an ATS score and improvement tips.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Your Resume</h3>
              <FileUploader title="Resume" onFileSelect={setResumeFile} />
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Job Description</h3>
              <FileUploader title="Job Description" onFileSelect={setJdFile} />
            </div>
          </div>
          <div className="mt-8 flex justify-end">
            <Button onClick={handleAnalyze} disabled={!resumeFile || !jdFile} className="glassmorphism-button">
              Analyze
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
