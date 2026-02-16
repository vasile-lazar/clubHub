import React from 'react';

interface TableProps {
  children: React.ReactNode;
  className?: string;
}

export const Table: React.FC<TableProps> = ({ children, className = '' }) => (
  <div className="overflow-x-auto -mx-4 sm:mx-0">
    <table className={`w-full text-left border-collapse ${className}`}>{children}</table>
  </div>
);

export const TableHead: React.FC<TableProps> = ({ children, className = '' }) => (
  <thead className={className}>{children}</thead>
);

export const TableBody: React.FC<TableProps> = ({ children, className = '' }) => (
  <tbody className={className}>{children}</tbody>
);

export const TableRow: React.FC<TableProps> = ({ children, className = '' }) => (
  <tr className={`border-b border-border-default hover:bg-bg-secondary/50 ${className}`}>
    {children}
  </tr>
);

export const TableHeaderCell: React.FC<TableProps> = ({ children, className = '' }) => (
  <th className={`py-3 px-4 font-semibold text-text-primary whitespace-nowrap ${className}`}>
    {children}
  </th>
);

export const TableCell: React.FC<TableProps> = ({ children, className = '' }) => (
  <td className={`py-3 px-4 text-text-primary ${className}`}>{children}</td>
);
