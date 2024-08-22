// src\XL\ExcelDataManager\ExcelDataManager.tsx
import React, { useState } from 'react';
import ExcelFileInput from '../ExcelFileInput';
import ExcelDataTable from '../ExcelDataTable';
import * as XLSX from '@e965/xlsx';
import styles from './ExcelDataManager.module.css';

const ExcelDataManager: React.FC = () => {
  const [data, setData] = useState<(string | number)[][]>([]);

  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const binaryStr = event.target?.result as string;
      const workbook = XLSX.read(binaryStr, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json<(string | number)[]>(sheet, {
        header: 1,
      });
      setData(jsonData);
    };
    reader.readAsBinaryString(file);
  };

  return (
    <div className={styles.excelDataManager}>
      <h2 className={styles.excelDataManagerTitle}>Excel Data Manager</h2>
      <ExcelFileInput onFileUpload={handleFileUpload} />
      <ExcelDataTable data={data} />
    </div>
  );
};

export default ExcelDataManager;
