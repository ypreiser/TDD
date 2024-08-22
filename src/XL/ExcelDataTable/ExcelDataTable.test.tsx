// src\XL\ExcelDataTable\ExcelDataTable.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ExcelDataTable from './ExcelDataTable';

describe('ExcelDataTable Component', () => {
  it('should render the provided data', () => {
    const mockData = [
      ['Header1', 'Header2'],
      ['Row1Col1', 1],
      ['Row2Col1', 2],
    ];
    render(<ExcelDataTable data={mockData} />);

    expect(screen.getByText('Excel Data:')).toBeInTheDocument();
    expect(screen.getByText('Header1')).toBeInTheDocument();
    expect(screen.getByText('Row1Col1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });
});
