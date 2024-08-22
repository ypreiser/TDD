// src\XL\ExcelFileInput\index.tsx
import React from 'react';

interface FileUploaderProps {
  onFileUpload: (file: File) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFileUpload }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileUpload(file);
    }
  };

  return (
    <div>
      <label>
        Upload an Excel file
        <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
      </label>
    </div>
  );
};

export default FileUploader;
