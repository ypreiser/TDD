// src\ExcelUploader.test.tsx
// ExcelUploader.test.tsx
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ExcelUploader from './ExcelUploader';

class MockFileReader extends FileReader {
  readAsBinaryString = vi.fn();
  onload = null as
    | ((
        this: FileReader,
        ev: ProgressEvent<FileReader>,
      ) => ProgressEvent<FileReader>)
    | null;
  // Include all other properties of FileReader here (error, onabort, etc.)
}

describe('ExcelUploader Component', () => {
  it('should upload and display the content of an Excel file', async () => {
    // Mock data as a binary string representing an Excel file
    const mockBinaryStr = 'mockBinaryString';

    // Mock XLSX library functions
    const mockSheetToJson = vi.fn().mockReturnValue([
      ['Header1', 'Header2'],
      ['Row1Col1', 1],
      ['Row2Col1', 2],
    ]);
    const mockRead = vi.fn().mockReturnValue({
      SheetNames: ['Sheet1'],
      Sheets: {
        Sheet1: 'mockSheetData',
      },
    });

    vi.mock('xlsx', () => ({
      read: mockRead,
      utils: {
        sheet_to_json: mockSheetToJson,
      },
    }));

    // Mock FileReader API
    const mockFileReader = new MockFileReader();
    vi.spyOn(window, 'FileReader').mockImplementation(() => mockFileReader);
    render(<ExcelUploader />);

    // Simulate file upload
    const inputFile = screen.getByLabelText(
      /upload an excel file/i,
    ) as HTMLInputElement;
    const file = new File(['mock content'], 'test.xlsx', {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });

    fireEvent.change(inputFile, { target: { files: [file] } });

    // Simulate onload event with the mock binary string
    if (mockFileReader.onload) {
      mockFileReader.onload.call(mockFileReader, {
        target: { result: mockBinaryStr },
      } as ProgressEvent<FileReader>);
    }

    // Wait for the table to render
    await waitFor(() => expect(mockSheetToJson).toHaveBeenCalledTimes(1));

    // Check that the table rows are rendered correctly
    expect(screen.getByText('Header1')).toBeInTheDocument();
    expect(screen.getByText('Row1Col1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();

    // Restore mocks
    vi.restoreAllMocks();
  });
});
