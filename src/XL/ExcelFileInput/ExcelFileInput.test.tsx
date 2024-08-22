// src\XL\ExcelFileInput\ExcelFileInput.test.tsx
import { render, fireEvent, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ExcelFileInput from './ExcelFileInput';

describe('ExcelFileInput Component', () => {
  it('should call onFileUpload when a file is selected', () => {
    const mockOnFileUpload = vi.fn();
    render(<ExcelFileInput onFileUpload={mockOnFileUpload} />);

    const file = new File(['mock content'], 'test.xlsx', {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    const input = screen.getByLabelText(
      /Choose an Excel file/i,
    ) as HTMLInputElement;
    fireEvent.change(input, { target: { files: [file] } });

    expect(mockOnFileUpload).toHaveBeenCalledWith(file);
  });
});
