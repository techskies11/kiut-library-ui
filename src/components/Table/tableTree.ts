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
