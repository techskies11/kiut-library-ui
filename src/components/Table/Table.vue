<template>
  <div
    class="kiut-table-wrap overflow-hidden rounded-xl border border-[#e5e7eb] bg-[color:var(--kiut-bg-secondary)] shadow-sm dark:border-[color:var(--kiut-border-light)]"
  >
    <div class="overflow-x-auto">
      <table class="kiut-table w-full min-w-[640px] border-collapse text-left text-sm">
        <thead>
          <tr
            class="h-12 border-b border-[#e5e7eb] bg-[#eaeaec80] dark:border-[color:var(--kiut-border-light)] dark:bg-[#23232f80]"
          >
            <th
              v-if="selectable"
              scope="col"
              class="w-12 px-4 py-3 text-center align-middle"
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
                alignClass(col.align),
                col.headerClass ?? '',
              ]"
            >
              {{ col.label }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(row, rowIndex) in rows"
            :key="rowKeyAt(row, rowIndex)"
            class="h-14 border-b border-[#e5e7eb] bg-transparent transition-colors hover:[background:var(--kiut-bg-table-hover)] dark:border-[color:var(--kiut-border-light)] dark:bg-[#141419]"
          >
            <td
              v-if="selectable"
              class="w-12 bg-transparent px-4 py-3 text-center align-middle"
            >
              <input
                type="checkbox"
                class="kiut-table-checkbox"
                :checked="isRowSelected(row, rowIndex)"
                :aria-label="ariaLabelForRow(row, rowIndex)"
                @change="onToggleRow(row, rowIndex)"
              />
            </td>
            <td
              v-for="col in columns"
              :key="col.key"
              :class="[
                'bg-transparent px-4 py-3 align-middle text-[color:var(--kiut-text-secondary)]',
                alignClass(col.align),
                col.cellClass ?? '',
              ]"
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
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue';

defineOptions({ name: 'Table' });

export type TableColumnAlign = 'left' | 'center' | 'right';

export interface TableColumn {
  key: string;
  label: string;
  align?: TableColumnAlign;
  headerClass?: string;
  cellClass?: string;
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
  }>(),
  {
    selectable: false,
    rowKey: 'id',
    selectedKeys: () => [],
    ariaLabelSelectAll: 'Seleccionar todas las filas',
    ariaLabelSelectRow: 'Seleccionar fila',
  }
);

const emit = defineEmits<{
  'update:selectedKeys': [keys: string[]];
}>();

const selectAllRef = ref<HTMLInputElement | null>(null);

function cellSlotName(key: string): string {
  return `cell-${key}`;
}

function alignClass(align: TableColumnAlign | undefined): string {
  if (align === 'center') return 'text-center';
  if (align === 'right') return 'text-right';
  return 'text-left';
}

function resolveRowKey(row: Record<string, unknown>, index: number): string {
  if (typeof props.rowKey === 'function') {
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
  if (v === null || v === undefined) return '';
  if (typeof v === 'object') return '';
  return String(v);
}

function rowKeyAt(row: Record<string, unknown>, index: number): string {
  return resolveRowKey(row, index);
}

const rowKeys = computed(() => props.rows.map((row, i) => resolveRowKey(row, i)));

function isRowSelected(row: Record<string, unknown>, index: number): boolean {
  const k = resolveRowKey(row, index);
  return props.selectedKeys.includes(k);
}

const allSelected = computed(() => {
  if (!props.selectable || props.rows.length === 0) return false;
  return rowKeys.value.every((k) => props.selectedKeys.includes(k));
});

const someSelected = computed(() => {
  if (!props.selectable || props.rows.length === 0) return false;
  const selected = rowKeys.value.filter((k) => props.selectedKeys.includes(k));
  return selected.length > 0 && selected.length < props.rows.length;
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
  { immediate: true }
);

function onToggleSelectAll(): void {
  if (!props.selectable) return;
  if (allSelected.value) {
    const next = props.selectedKeys.filter((k) => !rowKeys.value.includes(k));
    emit('update:selectedKeys', next);
  } else {
    const set = new Set(props.selectedKeys);
    rowKeys.value.forEach((k) => set.add(k));
    emit('update:selectedKeys', [...set]);
  }
}

function onToggleRow(row: Record<string, unknown>, index: number): void {
  if (!props.selectable) return;
  const k = resolveRowKey(row, index);
  const has = props.selectedKeys.includes(k);
  if (has) {
    emit(
      'update:selectedKeys',
      props.selectedKeys.filter((x) => x !== k)
    );
  } else {
    emit('update:selectedKeys', [...props.selectedKeys, k]);
  }
}

function ariaLabelForRow(row: Record<string, unknown>, index: number): string {
  const k = resolveRowKey(row, index);
  return `${props.ariaLabelSelectRow} ${k}`;
}
</script>

<style scoped>
.kiut-table {
  font-family: var(--kiut-table-font, 'Inter', system-ui, sans-serif);
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
</style>
