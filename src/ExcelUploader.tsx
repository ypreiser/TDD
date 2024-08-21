// src\Sheet.tsx
import React, { useState } from 'react';
import * as XLSX from '@e965/xlsx';

const ExcelUploader: React.FC = () => {
  const [data, setData] = useState<(string | number)[][]>([]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const binaryStr = event.target?.result as string;
      const workbook = XLSX.read(binaryStr, { type: 'binary' });

      // Assume the first sheet is the one you want to work with
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      // Convert sheet to JSON
      const jsonData = XLSX.utils.sheet_to_json<(string | number)[]>(sheet, {
        header: 1,
      });
      setData(jsonData);
    };
    reader.readAsBinaryString(file);
  };

  return (
    <div>
      <h2>Upload an Excel file</h2>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
      <h3>Excel Data:</h3>
      <table>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExcelUploader;
