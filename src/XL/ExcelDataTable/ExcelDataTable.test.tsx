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

    expect(
      screen.getByRole('columnheader', { name: 'Header1' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('columnheader', { name: 'Header2' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: 'Row1Col1' })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: '1' })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: 'Row2Col1' })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: '2' })).toBeInTheDocument();
  });

  it('should display a message when no data is available', () => {
    render(<ExcelDataTable data={[]} />);
    expect(screen.getByText('No data available')).toBeInTheDocument();
  });
});
