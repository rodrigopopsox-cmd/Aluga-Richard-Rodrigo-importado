'use client';

import type { CSSProperties, KeyboardEvent, ReactNode } from 'react';
import styles from './DataTable.module.css';

export interface DataTableColumn<T> {
  key: string;
  label: ReactNode;
  align?: 'left' | 'right' | 'center';
  width?: number | string;
  render?: (row: T) => ReactNode;
}

export interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  rows: T[];
  onRowClick?: (row: T) => void;
  /** Row id field. Default "id" */
  rowKey?: keyof T & string;
  /** Shown in a full-width row when `rows` is empty. Default "Nenhum resultado." */
  empty?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

/** Hairline-divided list table for units, tenants, payments. Place inside a Card. Horizontal-scrolls on mobile. */
export function DataTable<T extends object>({
  columns = [],
  rows = [],
  onRowClick,
  rowKey = 'id' as keyof T & string,
  empty = 'Nenhum resultado.',
  className,
  style,
}: DataTableProps<T>) {
  const cell = (row: T, key: string): ReactNode => (row as Record<string, unknown>)[key] as ReactNode;
  return (
    <div className={[styles.scroll, className].filter(Boolean).join(' ')} style={style}>
      <table className={[styles.table, onRowClick && styles.clickable].filter(Boolean).join(' ')}>
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c.key} style={{ textAlign: c.align ?? 'left', width: c.width }}>
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr className={styles.empty}>
              <td colSpan={columns.length} className={styles.emptyCell}>
                {empty}
              </td>
            </tr>
          ) : (
            rows.map((r, i) => {
              const id = r[rowKey];
              return (
                <tr
                  key={id != null ? String(id) : i}
                  onClick={onRowClick ? () => onRowClick(r) : undefined}
                  tabIndex={onRowClick ? 0 : undefined}
                  onKeyDown={
                    onRowClick
                      ? (e: KeyboardEvent<HTMLTableRowElement>) => {
                          if (e.key === 'Enter') onRowClick(r);
                        }
                      : undefined
                  }
                >
                  {columns.map((c) => (
                    <td key={c.key} style={{ textAlign: c.align ?? 'left' }}>
                      {c.render ? c.render(r) : cell(r, c.key)}
                    </td>
                  ))}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
