export interface FlatTableRow {
  row: Record<string, unknown>;
  key: string;
  depth: number;
  hasChildren: boolean;
  isExpanded: boolean;
  parentKey: string | null;
}

export interface FlattenTableRowsOptions {
  childrenKey: string;
  expandedKeys: ReadonlySet<string>;
  resolveRowKey: (row: Record<string, unknown>, index: number) => string;
  maxDepth?: number;
}

export interface TableRowSelectableContext {
  depth: number;
  isChild: boolean;
  hasChildren: boolean;
}

export type TableSortDirection = "asc" | "desc";

export type TableSortCompare = (
  a: Record<string, unknown>,
  b: Record<string, unknown>,
  key: string,
  direction: TableSortDirection,
) => number;

export interface SortTableRowsTreeOptions {
  childrenKey: string;
  sortKey: string;
  sortDirection: TableSortDirection;
  compare: TableSortCompare;
}

function readChildren(
  row: Record<string, unknown>,
  childrenKey: string,
): Record<string, unknown>[] {
  const raw = row[childrenKey];
  if (!Array.isArray(raw)) return [];
  return raw.filter(
    (item): item is Record<string, unknown> =>
      item !== null && typeof item === "object" && !Array.isArray(item),
  );
}

export function rowHasChildren(
  row: Record<string, unknown>,
  childrenKey: string,
): boolean {
  return readChildren(row, childrenKey).length > 0;
}

/**
 * Sorts each tree level independently (roots and nested children).
 * Returns a shallow-cloned tree so the source rows are not mutated.
 */
export function sortTableRowsTree(
  rows: Record<string, unknown>[],
  options: SortTableRowsTreeOptions,
): Record<string, unknown>[] {
  const { childrenKey, sortKey, sortDirection, compare } = options;

  return [...rows]
    .sort((a, b) => compare(a, b, sortKey, sortDirection))
    .map((row) => {
      const children = readChildren(row, childrenKey);
      if (children.length === 0) return row;

      return {
        ...row,
        [childrenKey]: sortTableRowsTree(children, options),
      };
    });
}

/** Flattens visible rows according to expanded state (for rendering). */
export function flattenVisibleTableRows(
  rows: Record<string, unknown>[],
  options: FlattenTableRowsOptions,
  depth = 0,
  parentKey: string | null = null,
  indexOffset = 0,
): FlatTableRow[] {
  const { childrenKey, expandedKeys, resolveRowKey, maxDepth } = options;
  const result: FlatTableRow[] = [];

  rows.forEach((row, index) => {
    const key = resolveRowKey(row, indexOffset + index);
    const children = readChildren(row, childrenKey);
    const hasChildren = children.length > 0;
    const isExpanded = expandedKeys.has(key);

    result.push({
      row,
      key,
      depth,
      hasChildren,
      isExpanded,
      parentKey,
    });

    if (
      hasChildren &&
      isExpanded &&
      (maxDepth === undefined || depth < maxDepth)
    ) {
      result.push(
        ...flattenVisibleTableRows(children, options, depth + 1, key, 0),
      );
    }
  });

  return result;
}

/** Collects every row key in the tree (for selection). */
export function collectAllTableRowKeys(
  rows: Record<string, unknown>[],
  options: Pick<FlattenTableRowsOptions, "childrenKey" | "resolveRowKey">,
  indexOffset = 0,
): string[] {
  const { childrenKey, resolveRowKey } = options;
  const keys: string[] = [];

  rows.forEach((row, index) => {
    const key = resolveRowKey(row, indexOffset + index);
    keys.push(key);
    const children = readChildren(row, childrenKey);
    if (children.length > 0) {
      keys.push(...collectAllTableRowKeys(children, options, 0));
    }
  });

  return keys;
}

/** Collects row keys that pass `isRowSelectable` (for select-all and bulk selection). */
export function collectSelectableTableRowKeys(
  rows: Record<string, unknown>[],
  options: Pick<FlattenTableRowsOptions, "childrenKey" | "resolveRowKey"> & {
    isRowSelectable?: (
      row: Record<string, unknown>,
      context: TableRowSelectableContext,
    ) => boolean;
  },
  depth = 0,
  indexOffset = 0,
): string[] {
  const { childrenKey, resolveRowKey, isRowSelectable } = options;
  const keys: string[] = [];

  rows.forEach((row, index) => {
    const key = resolveRowKey(row, indexOffset + index);
    const children = readChildren(row, childrenKey);
    const hasChildren = children.length > 0;
    const context: TableRowSelectableContext = {
      depth,
      isChild: depth > 0,
      hasChildren,
    };

    if (isRowSelectable?.(row, context) ?? true) {
      keys.push(key);
    }

    if (children.length > 0) {
      keys.push(
        ...collectSelectableTableRowKeys(children, options, depth + 1, 0),
      );
    }
  });

  return keys;
}
