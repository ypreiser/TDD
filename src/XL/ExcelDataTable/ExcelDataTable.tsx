// src\XL\ExcelDataTable\ExcelDataTable.tsx
interface ExcelDataTableProps {
  data: (string | number)[][];
}

const ExcelDataTable: React.FC<ExcelDataTableProps> = ({ data }) => {
  return (
    <div>
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

export default ExcelDataTable;
