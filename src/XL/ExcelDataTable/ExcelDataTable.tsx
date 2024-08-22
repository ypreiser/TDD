// src\XL\ExcelDataTable\ExcelDataTable.tsx
import React, { useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from '@tanstack/react-table';
import styles from './ExcelDataTable.module.css';

interface ExcelDataTableProps {
  data: (string | number)[][];
}

const ExcelDataTable: React.FC<ExcelDataTableProps> = ({ data }) => {
  const columnHelper = createColumnHelper<(string | number)[]>();

  const columns = useMemo(() => {
    if (data.length === 0) return [];
    return data[0].map((_, index) =>
      columnHelper.accessor((row) => row[index], {
        id: `column${index}`,
        cell: (info) => info.getValue(),
        header: () => data[0][index]?.toString() || `Column ${index + 1}`,
      }),
    );
  }, [data, columnHelper]);

  const table = useReactTable({
    data: useMemo(() => data.slice(1), [data]), // Remove header row from data
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (data.length === 0) {
    return <div className={styles.noDataMessage}>No data available</div>;
  }

  return (
    <div className={styles.excelDataTableContainer}>
      <h3 className={styles.excelDataTableHeader}>Excel Data</h3>
      <table className={styles.excelDataTable}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExcelDataTable;
