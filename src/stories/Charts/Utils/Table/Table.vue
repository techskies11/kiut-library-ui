<template>
  <div
    class="kiut-table-root table-section flex w-full min-w-0 flex-col rounded-xl font-sans antialiased text-[color:var(--kiut-text-primary,#1e293b)]"
    data-component="kiut-table"
  >
    <div class="overflow-x-auto">
      <table class="w-full table-auto border-collapse text-left text-[14px] leading-normal">
        <thead>
          <tr>
            <th
              v-for="col in columns"
              :key="col.key"
              scope="col"
              class="kiut-table-th whitespace-nowrap px-3 py-2 text-left text-[#9191a1]"
              :class="[alignClass(col.align), col.headerClass]"
            >
              {{ col.label }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, rowIndex) in displayedRows" :key="rowKeyFn(row, rowIndex)">
            <td
              v-for="col in columns"
              :key="`${rowIndex}-${col.key}`"
              class="kiut-table-td px-3 py-2 text-[color:var(--kiut-text-primary,#1e293b)]"
              :class="[alignClass(col.align), col.cellClass]"
            >
              <slot
                :name="cellSlotName(col.key)"
                :row="row"
                :column="col"
                :value="cellValue(row, col.key)"
              >
                {{ formatCell(cellValue(row, col.key)) }}
              </slot>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <button
      v-if="hasMoreRows"
      type="button"
      class="view-more-btn"
      @click="expanded = !expanded"
    >
      {{ expanded ? viewLessLabel : viewMoreCollapsedLabel }}
      <svg
        class="view-more-icon"
        :class="{ 'view-more-icon-rotated': expanded }"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  </div>
</template>

<script lang="ts">
export type TableColumnAlign = 'left' | 'center' | 'right'

export interface TableColumn {
  key: string
  label: string
  /** Opcional; reservado para extensiones (el peso visual es 500 en todas las celdas). */
  emphasis?: boolean
  align?: TableColumnAlign
  headerClass?: string
  cellClass?: string
}

export interface TableProps {
  columns: TableColumn[]
  rows: Record<string, unknown>[]
  /** Igual que Checkin: máximo de filas visibles antes de “View more”. */
  maxVisibleRows?: number
  /** Texto cuando está colapsado; `{count}` = filas ocultas. */
  viewMoreLabel?: string
  /** Texto cuando está expandido. */
  viewLessLabel?: string
  /** Campo en cada fila o función que devuelve un id estable (claves de fila en `<tbody>`). */
  rowKey?: string | ((row: Record<string, unknown>) => string | number)
}
</script>

<script setup lang="ts">
import { computed, ref } from 'vue'

const props = withDefaults(
  defineProps<TableProps>(),
  {
    maxVisibleRows: 3,
    viewMoreLabel: 'View more ({count} rows)',
    viewLessLabel: 'View less',
    rowKey: 'id',
  },
)

const expanded = ref(false)

const emptyPlaceholder = '—'

function formatCell(value: unknown): string {
  if (value === null || value === undefined || value === '') {
    return emptyPlaceholder
  }
  return String(value)
}

function alignClass(align: TableColumnAlign | undefined): string {
  if (align === 'center') return 'text-center'
  if (align === 'right') return 'text-right'
  return 'text-left'
}

function cellSlotName(key: string): string {
  return `cell-${key}`
}

function cellValue(row: Record<string, unknown>, key: string): unknown {
  return row[key]
}

function resolveRowKey(row: Record<string, unknown>, index: number): string | number {
  if (typeof props.rowKey === 'function') {
    return props.rowKey(row)
  }
  const raw = row[props.rowKey]
  if (typeof raw === 'string' || typeof raw === 'number') {
    return raw
  }
  return index
}

function rowKeyFn(row: Record<string, unknown>, index: number): string | number {
  return resolveRowKey(row, index)
}

const rowCount = computed(() => props.rows?.length ?? 0)

const hasMoreRows = computed(() => rowCount.value > props.maxVisibleRows)

const hiddenRowCount = computed(() => Math.max(0, rowCount.value - props.maxVisibleRows))

const displayedRows = computed(() => {
  if (!props.rows?.length) return []
  if (expanded.value || !hasMoreRows.value) {
    return props.rows
  }
  return props.rows.slice(0, props.maxVisibleRows)
})

const viewMoreCollapsedLabel = computed(() =>
  props.viewMoreLabel.replace(/\{count\}/g, String(hiddenRowCount.value)),
)
</script>

<style scoped>
@import '../../BusinessMetrics/view-more-cta.css';

.kiut-table-root thead th.kiut-table-th,
.kiut-table-root tbody td.kiut-table-td {
  font-size: 14px;
  font-weight: 500;
}

.kiut-table-root thead th.kiut-table-th {
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: var(--kiut-border-table, #e2e8f0);
}

.dark .kiut-table-root thead th.kiut-table-th,
.dark-mode .kiut-table-root thead th.kiut-table-th {
  border-bottom-color: #2d2d39;
}

.kiut-table-root tbody tr:not(:first-child) td.kiut-table-td {
  border-top-width: 1px;
  border-top-style: solid;
  border-top-color: var(--kiut-border-table-row, #f3f4f6);
}

.dark .kiut-table-root tbody tr:not(:first-child) td.kiut-table-td,
.dark-mode .kiut-table-root tbody tr:not(:first-child) td.kiut-table-td {
  border-top-color: #2d2d3980;
}
</style>
