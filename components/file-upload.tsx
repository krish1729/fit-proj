"use client";

import { useState } from "react";
import { Input } from "./ui/input";

interface FileUploadProps {
  maxSize?: number;
  acceptedTypes?: string[];
  endpoint: string;
}

export default function FileUpload({
  maxSize = 5 * 1024 * 1024,
  acceptedTypes = ['image/*', 'application/pdf'],
  endpoint
}: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?[0];
    setError(null);
    if (!selectedFile) return;
    if (selectedFile.size > maxSize) {
      setError(`File size must be less than ${maxSize / 1024 / 1024} MB`);
      return;
    }
    const fileType = selectedFile.type;
    const isValidType = acceptedTypes.some(type => {
      if (type.endsWith('/*')) {
        return fileType.startsWith(type.slice(0, -2));
      }
      return type === fileType;
    });

    if (!isValidType) {
      setError("Invalid File Type");
      return;
    }

    setFile(selectedFile);
  }

  return (
    <div className="space-y-4 w-full max-w-md">
      <div className="flex gap-2">
        <Input type="file" className="flex-1" />
      </div>
    </div>
  );
}
