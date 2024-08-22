// src\XL\ExcelFileInput\ExcelFileInput.tsx
import React from 'react';
import styles from './ExcelFileInput.module.css';

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
    <div className={styles.excelFileInput}>
      <label className={styles.excelFileInputLabel}>
        <span className={styles.excelFileInputText}>Choose an Excel file</span>
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileChange}
          className={styles.excelFileInputHidden}
        />
      </label>
    </div>
  );
};

export default ExcelFileInput;
