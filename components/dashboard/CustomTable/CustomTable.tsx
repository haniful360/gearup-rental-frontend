import { ITableProps } from '@/types/custom-table.types';

const CustomTable = <T extends object>({ columns, data }: ITableProps<T>) => {
  return (
    <div className="custom-scrollbar overflow-x-auto border-t border-border/60">
      <table className="min-w-full divide-y divide-border/60">
        <thead className="bg-slate-50/80 dark:bg-[#0E1726]">
          <tr>
            {columns?.map((column, index) => (
              <th
                key={index}
                scope="col"
                className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-nowrap text-slate-700 dark:text-slate-300"
              >
                {column?.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border/50 bg-card">
          {data?.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="hover:bg-slate-100/50 dark:hover:bg-slate-800/40 transition-colors"
            >
              {columns?.map((column, colIndex) => (
                <td
                  key={colIndex}
                  className="px-6 py-4 text-sm whitespace-nowrap text-slate-800 dark:text-slate-200"
                >
                  {'accessor' in column && column?.accessor
                    ? String(row[column?.accessor] ?? '')
                    : column?.cell?.(row, rowIndex)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomTable;
