import { ReactNode } from 'react';

export interface TableRowData {
  label: string;
  value: number | string | ReactNode | null;
  highlighted?: boolean;
}

export * from './functions';
