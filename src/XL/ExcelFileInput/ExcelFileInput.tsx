// src\XL\ExcelFileInput\ExcelFileInput.tsx
import React from 'react';

interface ExcelFileInputProps {
  onFileUpload: (file: File) => void;
}

const ExcelFileInput: React.FC<ExcelFileInputProps> = ({ onFileUpload }) => {
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

export default ExcelFileInput;
