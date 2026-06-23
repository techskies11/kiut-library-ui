<template>
  <div
    class="kiut-table-wrap overflow-hidden rounded-xl border border-[#e5e7eb] bg-[color:var(--kiut-bg-secondary)] shadow-sm dark:border-[color:var(--kiut-border-light)]"
  >
    <div class="w-full overflow-x-auto overflow-y-auto md:overflow-y-hidden">
      <table
        :class="[
          'kiut-table w-full min-w-[640px] overflow-hidden border-collapse text-left text-sm',
          fixedLayout ? 'table-fixed' : '',
        ]"
      >
        <thead>
          <tr
            class="h-12 border-b border-[#e5e7eb] bg-[#eaeaec80] dark:border-[color:var(--kiut-border-light)] dark:bg-[#23232f80]"
          >
            <th
              v-if="selectable"
              scope="col"
              class="w-12 bg-transparent pl-4 pr-0 py-3 text-center align-middle"
            >
              <input
                ref="selectAllRef"
                type="checkbox"
                class="kiut-table-checkbox"
                :checked="allSelected"
                :aria-label="ariaLabelSelectAll"
                @change="onToggleSelectAll"
              />
            </th>
            <th
              v-for="col in columns"
              :key="col.key"
              scope="col"
              :class="[
                'px-4 py-3 font-semibold tracking-tight text-[color:var(--kiut-text-table-header)]',
                isExpandColumn(col.key) && selectable ? '!pl-0' : '',
                alignClass(col.align),
                col.headerClass ?? '',
              ]"
            >
              <button
                v-if="col.sortable"
                type="button"
                class="kiut-table-sort-btn inline-flex items-center gap-1"
                :class="alignClass(col.align)"
                :aria-sort="ariaSortForColumn(col.key)"
                @click="onSortColumn(col.key)"
              >
                <span>{{ col.label }}</span>
                <span class="kiut-table-sort-icons inline-flex items-center" aria-hidden="true">
                  <template v-if="isActiveSortColumn(col.key)">
                    <span
                      v-if="sortDirection === 'asc'"
                      class="kiut-table-sort-arrow kiut-table-sort-arrow--active"
                    >↑</span>
                    <span
                      v-else-if="sortDirection === 'desc'"
                      class="kiut-table-sort-arrow kiut-table-sort-arrow--active"
                    >↓</span>
                  </template>
                  <template v-else>
                    <span class="kiut-table-sort-arrow kiut-table-sort-arrow--muted">↑</span>
                    <span class="kiut-table-sort-arrow kiut-table-sort-arrow--muted">↓</span>
                  </template>
                </span>
              </button>
              <template v-else>{{ col.label }}</template>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="entry in visibleRows"
            :key="entry.key"
            :class="[
              'min-h-14 border-b border-[#e5e7eb] last:border-b-0 bg-transparent transition-colors hover:[background:var(--kiut-bg-table-hover)] dark:border-[color:var(--kiut-border-light)] dark:bg-[#141419]',
              entry.depth > 0 ? 'kiut-table-row--child dark:bg-[#1a1a22]' : '',
            ]"
          >
            <td
              v-if="selectable"
              class="w-12 bg-transparent pl-4 pr-0 py-3 text-center align-middle"
            >
              <input
                v-if="isEntrySelectable(entry)"
                type="checkbox"
                class="kiut-table-checkbox"
                :checked="isRowSelectedByKey(entry.key)"
                :aria-label="ariaLabelForKey(entry.key)"
                @change="onToggleRowByKey(entry.key)"
              />
            </td>
            <td
              v-for="col in columns"
              :key="col.key"
              :class="[
                'bg-transparent py-3 align-middle text-[color:var(--kiut-text-secondary)]',
                isExpandColumn(col.key) ? 'pl-0 pr-2' : 'px-2',
                alignClass(col.align),
                col.cellClass ?? '',
              ]"
            >
              <div
                v-if="isExpandColumn(col.key)"
                class="flex min-w-0 items-start gap-0"
                :style="{ paddingLeft: `${entry.depth * 1}rem` }"
              >
                <slot
                  name="row-expand"
                  :row="entry.row"
                  :expanded="entry.isExpanded"
                  :has-children="entry.hasChildren"
                  :depth="entry.depth"
                  :toggle="() => toggleExpand(entry)"
                >
                  <button
                    v-if="canExpandRow(entry)"
                    type="button"
                    class="kiut-table-expand-btn shrink-0"
                    :aria-expanded="entry.isExpanded"
                    :aria-label="entry.isExpanded ? ariaLabelCollapseRow : ariaLabelExpandRow"
                    @click.stop="toggleExpand(entry)"
                  >
                    <ChevronDownIcon
                      class="h-4 w-4 text-[color:var(--kiut-text-muted)] transition-transform duration-200"
                      :class="{ '-rotate-90': !entry.isExpanded }"
                      aria-hidden="true"
                    />
                  </button>
                  <span
                    v-else
                    class="inline-block w-4 shrink-0"
                    aria-hidden="true"
                  />
                </slot>
                <div class="min-w-0 flex-1">
                  <slot
                    :name="cellSlotName(col.key)"
                    v-bind="cellSlotProps(entry, col)"
                  >
                    {{ formatCell(cellValue(entry.row, col.key)) }}
                  </slot>
                </div>
              </div>
              <slot
                v-else
                :name="cellSlotName(col.key)"
                v-bind="cellSlotProps(entry, col)"
              >
                {{ formatCell(cellValue(entry.row, col.key)) }}
              </slot>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChevronDownIcon } from "@heroicons/vue/24/outline";
import { computed, nextTick, ref, watch } from "vue";
import {
  collectSelectableTableRowKeys,
  flattenVisibleTableRows,
  type FlatTableRow,
  type TableRowSelectableContext,
} from "./tableTree";

defineOptions({ name: "Table" });

export type { FlatTableRow, TableRowSelectableContext } from "./tableTree";

export type TableColumnAlign = "left" | "center" | "right";

export interface TableColumn {
  key: string;
  label: string;
  align?: TableColumnAlign;
  headerClass?: string;
  cellClass?: string;
  /** Header clickeable; requiere `sortKey` / `sortDirection` en la tabla y escuchar `@sort`. */
  sortable?: boolean;
}

export type TableSortDirection = "asc" | "desc";

export interface TableCellSlotProps {
  row: Record<string, unknown>;
  column: TableColumn;
  value: unknown;
  depth: number;
  isChild: boolean;
  hasChildren: boolean;
  expanded: boolean;
}

const props = withDefaults(
  defineProps<{
    columns: TableColumn[];
    rows: Record<string, unknown>[];
    selectable?: boolean;
    /** Campo en cada fila o función que devuelve un id estable (necesario si selectable) */
    rowKey?: string | ((row: Record<string, unknown>) => string);
    selectedKeys?: string[];
    ariaLabelSelectAll?: string;
    ariaLabelSelectRow?: string;
    /**
     * Activa `table-layout: fixed`. Las columnas respetan los anchos definidos
     * en `headerClass`/`cellClass` (p. ej. `w-[160px]`) sin redistribuirse
     * según el contenido. El texto sobrante se trunca con `overflow-hidden`.
     */
    fixedLayout?: boolean;
    sortKey?: string | null;
    sortDirection?: TableSortDirection | null;
    /** Activa filas en cascada (padre → hijos en `childrenKey`). */
    expandable?: boolean;
    /** Campo en cada fila donde están los hijos. */
    childrenKey?: string;
    /** Columna que muestra chevron e indentación. Default: primera columna. */
    expandColumnKey?: string;
    /** Keys de filas expandidas (controlado). */
    expandedKeys?: string[];
    /** Keys expandidas al montar (no controlado). */
    defaultExpandedKeys?: string[];
    /** Solo una fila expandida a la vez. */
    singleExpand?: boolean;
    /** Profundidad máxima del árbol (0 = solo raíces). */
    maxDepth?: number;
    /** Fila expandible aunque no tenga hijos (p. ej. carga lazy). */
    isRowExpandable?: (row: Record<string, unknown>) => boolean;
    /** Si la fila muestra checkbox de selección (p. ej. ocultar en filas padre de un grupo). */
    isRowSelectable?: (
      row: Record<string, unknown>,
      context: TableRowSelectableContext,
    ) => boolean;
    ariaLabelExpandRow?: string;
    ariaLabelCollapseRow?: string;
  }>(),
  {
    selectable: false,
    rowKey: "id",
    selectedKeys: () => [],
    ariaLabelSelectAll: "Seleccionar todas las filas",
    ariaLabelSelectRow: "Seleccionar fila",
    fixedLayout: false,
    sortKey: null,
    sortDirection: null,
    expandable: false,
    childrenKey: "children",
    expandColumnKey: undefined,
    expandedKeys: undefined,
    defaultExpandedKeys: () => [],
    singleExpand: false,
    maxDepth: undefined,
    isRowExpandable: undefined,
    isRowSelectable: undefined,
    ariaLabelExpandRow: "Expandir fila",
    ariaLabelCollapseRow: "Contraer fila",
  },
);

const emit = defineEmits<{
  "update:selectedKeys": [keys: string[]];
  "update:expandedKeys": [keys: string[]];
  sort: [key: string];
  expand: [key: string, row: Record<string, unknown>];
  collapse: [key: string, row: Record<string, unknown>];
}>();

const selectAllRef = ref<HTMLInputElement | null>(null);
const internalExpandedKeys = ref<string[]>([...props.defaultExpandedKeys]);

const expandedKeysModel = computed({
  get(): string[] {
    return props.expandedKeys ?? internalExpandedKeys.value;
  },
  set(keys: string[]): void {
    internalExpandedKeys.value = keys;
    emit("update:expandedKeys", keys);
  },
});

const expandedKeysSet = computed(
  () => new Set(expandedKeysModel.value),
);

const effectiveExpandColumnKey = computed(
  () => props.expandColumnKey ?? props.columns[0]?.key ?? "",
);

const treeOptions = computed(() => ({
  childrenKey: props.childrenKey,
  expandedKeys: expandedKeysSet.value,
  resolveRowKey,
  maxDepth: props.maxDepth,
}));

const visibleRows = computed((): FlatTableRow[] => {
  if (!props.expandable) {
    return props.rows.map((row, index) => ({
      row,
      key: resolveRowKey(row, index),
      depth: 0,
      hasChildren: false,
      isExpanded: false,
      parentKey: null,
    }));
  }
  return flattenVisibleTableRows(props.rows, treeOptions.value);
});

function cellSlotName(key: string): string {
  return `cell-${key}`;
}

function alignClass(align: TableColumnAlign | undefined): string {
  if (align === "center") return "text-center";
  if (align === "right") return "text-right";
  return "text-left";
}

function resolveRowKey(row: Record<string, unknown>, index: number): string {
  if (typeof props.rowKey === "function") {
    return props.rowKey(row);
  }
  const raw = row[props.rowKey];
  if (raw !== undefined && raw !== null) return String(raw);
  return `__index_${index}`;
}

function cellValue(row: Record<string, unknown>, key: string): unknown {
  return row[key];
}

function formatCell(v: unknown): string {
  if (v === null || v === undefined) return "";
  if (typeof v === "object") return "";
  return String(v);
}

function isExpandColumn(colKey: string): boolean {
  return props.expandable && colKey === effectiveExpandColumnKey.value;
}

function canExpandRow(entry: FlatTableRow): boolean {
  return entry.hasChildren || (props.isRowExpandable?.(entry.row) ?? false);
}

function cellSlotProps(
  entry: FlatTableRow,
  column: TableColumn,
): TableCellSlotProps {
  return {
    row: entry.row,
    column,
    value: cellValue(entry.row, column.key),
    depth: entry.depth,
    isChild: entry.depth > 0,
    hasChildren: entry.hasChildren,
    expanded: entry.isExpanded,
  };
}

function toggleExpand(entry: FlatTableRow): void {
  if (!canExpandRow(entry)) return;

  const set = new Set(expandedKeysModel.value);
  if (set.has(entry.key)) {
    set.delete(entry.key);
    emit("collapse", entry.key, entry.row);
  } else {
    if (props.singleExpand) {
      set.clear();
    }
    set.add(entry.key);
    emit("expand", entry.key, entry.row);
  }
  expandedKeysModel.value = [...set];
}

function rowSelectableContext(entry: FlatTableRow): TableRowSelectableContext {
  return {
    depth: entry.depth,
    isChild: entry.depth > 0,
    hasChildren: entry.hasChildren,
  };
}

function isRowSelectableByRow(
  row: Record<string, unknown>,
  context: TableRowSelectableContext,
): boolean {
  return props.isRowSelectable?.(row, context) ?? true;
}

function isEntrySelectable(entry: FlatTableRow): boolean {
  return isRowSelectableByRow(entry.row, rowSelectableContext(entry));
}

const selectableRowKeys = computed(() => {
  const { isRowSelectable } = props;

  if (props.expandable) {
    return collectSelectableTableRowKeys(props.rows, {
      childrenKey: props.childrenKey,
      resolveRowKey,
      isRowSelectable,
    });
  }

  return props.rows
    .map((row, index) => ({
      row,
      key: resolveRowKey(row, index),
      context: {
        depth: 0,
        isChild: false,
        hasChildren: false,
      } satisfies TableRowSelectableContext,
    }))
    .filter(({ row, context }) => isRowSelectableByRow(row, context))
    .map(({ key }) => key);
});

function isRowSelectedByKey(key: string): boolean {
  return props.selectedKeys.includes(key);
}

const allSelected = computed(() => {
  if (!props.selectable || selectableRowKeys.value.length === 0) return false;
  return selectableRowKeys.value.every((k) => props.selectedKeys.includes(k));
});

const someSelected = computed(() => {
  if (!props.selectable || selectableRowKeys.value.length === 0) return false;
  const selected = selectableRowKeys.value.filter((k) =>
    props.selectedKeys.includes(k),
  );
  return selected.length > 0 && selected.length < selectableRowKeys.value.length;
});

watch(
  [someSelected, allSelected, () => props.selectable],
  async () => {
    await nextTick();
    const el = selectAllRef.value;
    if (el) {
      el.indeterminate = someSelected.value && !allSelected.value;
    }
  },
  { immediate: true },
);

function onToggleSelectAll(): void {
  if (!props.selectable) return;
  if (allSelected.value) {
    const next = props.selectedKeys.filter(
      (k) => !selectableRowKeys.value.includes(k),
    );
    emit("update:selectedKeys", next);
  } else {
    const set = new Set(props.selectedKeys);
    selectableRowKeys.value.forEach((k) => set.add(k));
    emit("update:selectedKeys", [...set]);
  }
}

function onToggleRowByKey(key: string): void {
  if (!props.selectable || !selectableRowKeys.value.includes(key)) return;
  const has = props.selectedKeys.includes(key);
  if (has) {
    emit(
      "update:selectedKeys",
      props.selectedKeys.filter((x) => x !== key),
    );
  } else {
    emit("update:selectedKeys", [...props.selectedKeys, key]);
  }
}

function ariaLabelForKey(key: string): string {
  return `${props.ariaLabelSelectRow} ${key}`;
}

function onSortColumn(key: string): void {
  emit("sort", key);
}

function isActiveSortColumn(key: string): boolean {
  return props.sortKey === key && props.sortDirection != null;
}

function ariaSortForColumn(
  key: string,
): "none" | "ascending" | "descending" {
  if (!isActiveSortColumn(key)) return "none";
  return props.sortDirection === "asc" ? "ascending" : "descending";
}
</script>

<style scoped>
.kiut-table {
  font-family: var(--kiut-table-font, "Inter", system-ui, sans-serif);
}

.kiut-table-expand-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  border-radius: 4px;
}

.kiut-table-expand-btn:focus-visible {
  outline: 2px solid var(--kiut-primary-light, #a78bfa);
  outline-offset: 2px;
}

@media (prefers-reduced-motion: reduce) {
  .kiut-table-expand-btn :deep(svg) {
    transition: none;
  }
}

/* Selección: checkbox circular (referencia UI) */
.kiut-table-checkbox {
  appearance: none;
  -webkit-appearance: none;
  width: 1.125rem;
  height: 1.125rem;
  margin: 0;
  flex-shrink: 0;
  vertical-align: middle;
  cursor: pointer;
  border-radius: 9999px;
  border: 2px solid var(--kiut-primary);
  background-color: transparent;
  transition:
    background-color 0.15s ease,
    border-color 0.15s ease,
    box-shadow 0.15s ease;
}

.kiut-table-checkbox:checked {
  background-color: var(--kiut-primary);
  border-color: var(--kiut-primary);
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M5 13l4 4L19 7'/%3E%3C/svg%3E");
  background-size: 0.65rem;
  background-position: center;
  background-repeat: no-repeat;
}

.kiut-table-checkbox:indeterminate {
  background-color: var(--kiut-primary);
  border-color: var(--kiut-primary);
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Crect x='6' y='10.5' width='12' height='3' rx='1' fill='white'/%3E%3C/svg%3E");
  background-size: 0.65rem 0.25rem;
  background-position: center;
  background-repeat: no-repeat;
}

.kiut-table-checkbox:focus-visible {
  outline: 2px solid var(--kiut-primary-light);
  outline-offset: 2px;
}

@media (prefers-reduced-motion: reduce) {
  .kiut-table-checkbox {
    transition: none;
  }
}

.kiut-table-sort-btn {
  margin: 0;
  padding: 0;
  border: none;
  background: transparent;
  font: inherit;
  font-weight: 600;
  letter-spacing: inherit;
  color: inherit;
  cursor: pointer;
}

.kiut-table-sort-btn.text-left {
  justify-content: flex-start;
}

.kiut-table-sort-btn.text-center {
  justify-content: center;
  width: 100%;
}

.kiut-table-sort-btn.text-right {
  justify-content: flex-end;
  width: 100%;
}

.kiut-table-sort-btn:focus-visible {
  outline: 2px solid var(--kiut-primary-light, #a78bfa);
  outline-offset: 2px;
  border-radius: 4px;
}

.kiut-table-sort-arrow {
  font-size: inherit;
  line-height: 1;
}

.kiut-table-sort-arrow--active {
  opacity: 1;
}

.kiut-table-sort-arrow--muted {
  opacity: 0.45;
}
</style>
