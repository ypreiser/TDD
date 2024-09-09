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
        raw: false, // Convert dates to strings automatically
        defval: '',
      });

      // Map through the jsonData to convert any date serial numbers to readable format
      const formattedData = jsonData.map(row =>
        row.map(cell => {
          if (typeof cell === 'number') {
            const formattedCell = XLSX.SSF.format('m/d/yy h:mm', cell);
            return isNaN(Date.parse(formattedCell)) ? cell : formattedCell;
          }
          return cell;
        })
      );

      // Trim empty rows and columns
      const trimmedData = trimEmptyRowsAndColumns(formattedData);

      setData(trimmedData);
      console.log(trimmedData);
    };
    reader.readAsBinaryString(file);
  };

  const trimEmptyRowsAndColumns = (data: (string | number)[][]): (string | number)[][] => {
    // Remove empty rows (consider a row empty if all cells are empty strings or null/undefined)
    const rowsTrimmed = data.filter(row => row.some(cell => cell !== '' && cell != null));

    // Find the last non-empty column
    const lastNonEmptyColumn = Math.max(...rowsTrimmed.map(row => 
      row.reduce((acc, cell, index) => (cell !== '' && cell != null) ? index : acc, -1) as number
    ), -1);

    // Trim columns
    return rowsTrimmed.map(row => row.slice(0, lastNonEmptyColumn + 1));
  };

  return (
    <div className={styles.excelDataManager}>
      <h2 className={styles.excelDataManagerTitle}>Excel Data Manager</h2>
      <ExcelFileInput onFileUpload={handleFileUpload} />
      <ExcelDataTable data={data} />
      <button onClick={() => console.table(data)}>Print Data</button> 
    </div>
  );
};

export default ExcelDataManager;
