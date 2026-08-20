export type TableComparativeTone = 'positive' | 'negative' | 'neutral';

export interface TableComparativeColumn {
  key: string;
  label: string;
  /** Legend dot in the column header. */
  color?: string;
}

export interface TableComparativeCell {
  /** Formatted primary value, e.g. `42,756` or `$82,756`. */
  value: string;
  /** Formatted delta under the value, e.g. `+0.6%`. */
  delta?: string | null;
  tone?: TableComparativeTone;
  /** When true, the cell renders an em dash instead of value/delta. */
  empty?: boolean;
}

export interface TableComparativeRow {
  id: string;
  label: string;
  cells: Record<string, TableComparativeCell>;
}

export interface TableComparativeGroup {
  id: string;
  label: string;
  /** Defaults to true. */
  defaultExpanded?: boolean;
  rows: TableComparativeRow[];
}

export interface TableComparativeCellSlotProps {
  row: TableComparativeRow;
  group: TableComparativeGroup;
  column: TableComparativeColumn;
  cell: TableComparativeCell | undefined;
}

export interface TableComparativeRowHeaderSlotProps {
  row: TableComparativeRow;
  group: TableComparativeGroup;
}

export interface TableComparativeColumnHeaderSlotProps {
  column: TableComparativeColumn;
}

export interface TableComparativeLabels {
  rowHeader: string;
  empty: string;
  expandGroup: string;
  collapseGroup: string;
  deltaHint: string;
  metricsCount: (count: number) => string;
}

export const DEFAULT_TABLE_COMPARATIVE_LABELS: TableComparativeLabels = {
  rowHeader: 'METRIC',
  empty: 'No metrics to compare.',
  expandGroup: 'Expand group',
  collapseGroup: 'Collapse group',
  deltaHint: 'vs benchmark',
  metricsCount: (count: number) => (count === 1 ? '1 metric' : `${count} metrics`),
};
