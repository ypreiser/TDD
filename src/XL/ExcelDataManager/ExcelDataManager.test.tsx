// src\XL\ExcelDataManager\ExcelDataManager.test.tsx
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ExcelDataManager from './ExcelDataManager';
import * as XLSX from '@e965/xlsx';

// Mock the child components
vi.mock('../ExcelFileInput', () => ({
  default: ({ onFileUpload }: { onFileUpload: (file: File) => void }) => (
    <input
      type="file"
      data-testid="file-input"
      onChange={(e) => onFileUpload(e.target.files![0])}
    />
  ),
}));

vi.mock('../ExcelDataTable', () => ({
  default: ({ data }: { data: (string | number)[][] }) => (
    <table data-testid="excel-table">
      <tbody>
        {data.map((row, i) => (
          <tr key={i}>
            {row.map((cell, j) => (
              <td key={j}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  ),
}));

// Mock the XLSX library
vi.mock('@e965/xlsx', () => ({
  read: vi.fn(),
  utils: {
    sheet_to_json: vi.fn(),
  },
}));

describe('ExcelDataManager Component', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should upload and display the content of an Excel file', async () => {
    const mockData = [
      ['Header1', 'Header2'],
      ['Row1Col1', 1],
      ['Row2Col1', 2],
    ];

    const mockWorkSheet: XLSX.WorkSheet = {
      '!ref': 'A1:B3',
      A1: { t: 's', v: 'Header1' },
      B1: { t: 's', v: 'Header2' },
      A2: { t: 's', v: 'Row1Col1' },
      B2: { t: 'n', v: 1 },
      A3: { t: 's', v: 'Row2Col1' },
      B3: { t: 'n', v: 2 },
    };

    const xlsxMock = vi.mocked(await import('@e965/xlsx'), true);
    xlsxMock.read.mockReturnValue({
      SheetNames: ['Sheet1'],
      Sheets: {
        ['mockSheetData']: mockWorkSheet,
      },
    });
    xlsxMock.utils.sheet_to_json.mockReturnValue(mockData);

    render(<ExcelDataManager />);

    const file = new File(['mock content'], 'test.xlsx', {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    const input = screen.getByTestId('file-input') as HTMLInputElement;
    fireEvent.change(input, { target: { files: [file] } });

    await waitFor(() => {
      const table = screen.getByTestId('excel-table');
      expect(table).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText('Header1')).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText('Header2')).toBeInTheDocument();
    });
    expect(screen.getByRole('cell', { name: 'Row1Col1' })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: '1' })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: 'Row2Col1' })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: '2' })).toBeInTheDocument();

    expect(xlsxMock.read).toHaveBeenCalled();

    expect(xlsxMock.utils.sheet_to_json).toHaveBeenCalled();
  });
});
