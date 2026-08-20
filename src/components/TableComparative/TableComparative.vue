<template>
  <div
    class="kiut-table-comparative-wrap overflow-hidden rounded-xl border border-[#e5e7eb] bg-[color:var(--kiut-bg-secondary)] shadow-sm dark:border-[color:var(--kiut-border-light)]"
  >
    <div
      v-if="loading"
      class="space-y-3 px-4 py-8"
      role="status"
      aria-live="polite"
    >
      <span class="sr-only">Loading</span>
      <div
        class="h-4 max-w-xs animate-pulse rounded bg-[#eaeaec] dark:bg-[#2d2d39]"
      />
      <div class="h-24 animate-pulse rounded bg-[#f3f4f6] dark:bg-[#23232f]" />
      <div class="h-24 animate-pulse rounded bg-[#f3f4f6] dark:bg-[#23232f]" />
    </div>

    <p
      v-else-if="isEmpty"
      class="px-4 py-12 text-center text-sm text-[color:var(--kiut-text-secondary)]"
    >
      {{ resolvedLabels.empty }}
    </p>

    <div
      v-else
      class="kiut-table-comparative-scroll w-full overflow-auto"
      :style="{ maxHeight }"
    >
      <table
        class="kiut-table-comparative w-full min-w-[640px] text-left text-sm"
      >
        <thead>
          <tr
            class="border-b border-[#e5e7eb] dark:border-[color:var(--kiut-border-light)]"
          >
            <th
              scope="col"
              class="kiut-table-comparative__head-corner py-3 pl-3 pr-3 text-xs font-semibold uppercase tracking-wide text-[color:var(--kiut-text-muted)]"
            >
              {{ resolvedLabels.rowHeader }}
            </th>
            <th
              v-for="column in columns"
              :key="column.key"
              scope="col"
              class="kiut-table-comparative__head-cell min-w-[7.5rem] px-3 py-3 text-center text-xs font-semibold uppercase tracking-wide text-[color:var(--kiut-text-table-header)]"
            >
              <slot name="column-header" :column="column">
                <div class="inline-flex items-center justify-center gap-2">
                  <span
                    v-if="column.color"
                    class="h-2 w-2 shrink-0 rounded-full"
                    :style="{ backgroundColor: column.color }"
                    aria-hidden="true"
                  />
                  <span>{{ column.label }}</span>
                </div>
              </slot>
            </th>
          </tr>
        </thead>
        <tbody>
          <template v-for="group in groups" :key="group.id">
            <tr class="kiut-table-comparative__category-row">
              <th
                scope="row"
                class="kiut-table-comparative__category-cell kiut-table-comparative__category-cell--label px-2 py-2 text-left"
              >
                <button
                  type="button"
                  class="kiut-table-comparative__group-btn flex w-full min-w-0 items-center gap-2"
                  :aria-expanded="isGroupExpanded(group.id)"
                  :aria-label="groupToggleAriaLabel(group)"
                  @click="toggleGroup(group.id)"
                >
                  <ChevronDownIcon
                    class="h-4 w-4 shrink-0 text-[color:var(--kiut-text-muted)] transition-transform duration-200"
                    :class="{ '-rotate-90': !isGroupExpanded(group.id) }"
                    aria-hidden="true"
                  />
                  <span
                    class="min-w-0 truncate text-[11px] font-bold uppercase tracking-wider text-[color:var(--kiut-primary)]"
                  >
                    {{ group.label }}
                  </span>
                  <span
                    class="shrink-0 text-[11px] font-medium text-[color:var(--kiut-text-muted)]"
                  >
                    {{ resolvedLabels.metricsCount(group.rows.length) }}
                  </span>
                </button>
              </th>
              <td
                v-for="column in columns"
                :key="`${group.id}-${column.key}`"
                class="kiut-table-comparative__category-cell kiut-table-comparative__category-cell--fill py-2"
                aria-hidden="true"
              />
            </tr>
            <tr
              v-for="row in group.rows"
              v-show="isGroupExpanded(group.id)"
              :key="`${group.id}-${row.id}`"
              class="kiut-table-comparative__metric-row border-b border-[#f3f4f6] dark:border-[color:var(--kiut-border-table-row)]"
              :class="{ 'is-active': isRowActive(group, row) }"
              @click="selectMetricRow(group, row)"
            >
              <th
                scope="row"
                class="kiut-table-comparative__row-label align-middle px-3 py-2.5 text-sm font-normal"
              >
                <slot name="row-header" :row="row" :group="group">
                  <span
                    class="block font-semibold text-[color:var(--kiut-text-primary)]"
                  >
                    {{ row.label }}
                  </span>
                </slot>
              </th>
              <td
                v-for="column in columns"
                :key="`${row.id}-${column.key}`"
                class="kiut-table-comparative__row-data align-middle px-3 py-2.5 text-center"
              >
                <slot name="cell" v-bind="cellSlotProps(row, group, column)">
                  <div
                    v-if="isCellEmpty(row, column)"
                    class="text-xs text-[color:var(--kiut-text-muted)]"
                  >
                    —
                  </div>
                  <div v-else class="flex flex-col items-center gap-0.5">
                    <span
                      class="tabular-nums text-sm font-bold leading-tight"
                      :class="toneValueClass(cellFor(row, column)?.tone)"
                    >
                      {{ cellFor(row, column)?.value }}
                    </span>
                    <span
                      v-if="cellFor(row, column)?.delta"
                      class="tabular-nums text-[11px] font-medium leading-tight"
                      :class="toneValueClass(cellFor(row, column)?.tone)"
                    >
                      {{ cellFor(row, column)?.delta }}
                    </span>
                    <span v-if="cellFor(row, column)?.delta" class="sr-only">
                      {{ resolvedLabels.deltaHint }}
                    </span>
                  </div>
                </slot>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChevronDownIcon } from "@heroicons/vue/24/outline";
import { computed, ref, watch } from "vue";
import {
  DEFAULT_TABLE_COMPARATIVE_LABELS,
  type TableComparativeCell,
  type TableComparativeCellSlotProps,
  type TableComparativeColumn,
  type TableComparativeGroup,
  type TableComparativeLabels,
  type TableComparativeRow,
  type TableComparativeTone,
} from "./tableComparativeTypes";

defineOptions({ name: "TableComparative" });

export type {
  TableComparativeCell,
  TableComparativeCellSlotProps,
  TableComparativeColumn,
  TableComparativeColumnHeaderSlotProps,
  TableComparativeGroup,
  TableComparativeLabels,
  TableComparativeRow,
  TableComparativeRowHeaderSlotProps,
  TableComparativeTone,
} from "./tableComparativeTypes";

const TONE_VALUE_CLASS: Record<TableComparativeTone, string> = {
  positive: "text-emerald-600 dark:text-emerald-400",
  negative: "text-red-600 dark:text-red-400",
  neutral: "text-[color:var(--kiut-text-primary)]",
};

const props = withDefaults(
  defineProps<{
    columns: TableComparativeColumn[];
    groups: TableComparativeGroup[];
    loading?: boolean;
    empty?: boolean;
    /** Controlled expanded group ids. Omit for internal state. */
    expandedGroupIds?: string[];
    labels?: Partial<TableComparativeLabels>;
    /** CSS max-height of the scroll area. */
    maxHeight?: string;
  }>(),
  {
    loading: false,
    empty: undefined,
    expandedGroupIds: undefined,
    labels: undefined,
    maxHeight: "min(70vh, 30rem)",
  },
);

const emit = defineEmits<{
  "update:expandedGroupIds": [ids: string[]];
  expand: [id: string, group: TableComparativeGroup];
  collapse: [id: string, group: TableComparativeGroup];
}>();

const resolvedLabels = computed(
  (): TableComparativeLabels => ({
    ...DEFAULT_TABLE_COMPARATIVE_LABELS,
    ...props.labels,
  }),
);

const isEmpty = computed(() => {
  if (props.empty !== undefined) return props.empty;
  return props.groups.length === 0;
});

function defaultExpandedIds(groups: TableComparativeGroup[]): string[] {
  return groups
    .filter((group) => group.defaultExpanded !== false)
    .map((group) => group.id);
}

const internalExpandedIds = ref<string[]>(defaultExpandedIds(props.groups));

const expandedIdsModel = computed({
  get(): string[] {
    return props.expandedGroupIds ?? internalExpandedIds.value;
  },
  set(ids: string[]): void {
    internalExpandedIds.value = ids;
    emit("update:expandedGroupIds", ids);
  },
});

watch(
  () => props.groups.map((group) => group.id).join("\0"),
  () => {
    if (props.expandedGroupIds !== undefined) return;
    const current = new Set(internalExpandedIds.value);
    for (const id of defaultExpandedIds(props.groups)) {
      current.add(id);
    }
    const valid = new Set(props.groups.map((group) => group.id));
    internalExpandedIds.value = [...current].filter((id) => valid.has(id));
  },
);

function isGroupExpanded(id: string): boolean {
  return expandedIdsModel.value.includes(id);
}

function groupById(id: string): TableComparativeGroup | undefined {
  return props.groups.find((group) => group.id === id);
}

function toggleGroup(id: string): void {
  const group = groupById(id);
  if (!group) return;
  const set = new Set(expandedIdsModel.value);
  if (set.has(id)) {
    set.delete(id);
    emit("collapse", id, group);
  } else {
    set.add(id);
    emit("expand", id, group);
  }
  expandedIdsModel.value = [...set];
}

function groupToggleAriaLabel(group: TableComparativeGroup): string {
  const action = isGroupExpanded(group.id)
    ? resolvedLabels.value.collapseGroup
    : resolvedLabels.value.expandGroup;
  return `${action}: ${group.label}`;
}

function cellFor(
  row: TableComparativeRow,
  column: TableComparativeColumn,
): TableComparativeCell | undefined {
  return row.cells[column.key];
}

function isCellEmpty(
  row: TableComparativeRow,
  column: TableComparativeColumn,
): boolean {
  const cell = cellFor(row, column);
  if (!cell || cell.empty) return true;
  return cell.value == null || cell.value === "";
}

function cellSlotProps(
  row: TableComparativeRow,
  group: TableComparativeGroup,
  column: TableComparativeColumn,
): TableComparativeCellSlotProps {
  return {
    row,
    group,
    column,
    cell: cellFor(row, column),
  };
}

const activeRowId = ref<string | null>(null);

function metricRowKey(group, row) {
  return `${group.id}-${row.id}`;
}
function isRowActive(group, row) {
  return activeRowId.value === metricRowKey(group, row);
}

function selectMetricRow(group, row) {
  const key = metricRowKey(group, row);
  activeRowId.value = activeRowId.value === key ? null : key;
}

function toneValueClass(tone: TableComparativeTone | undefined): string {
  return TONE_VALUE_CLASS[tone ?? "neutral"];
}
</script>

<style scoped>
/*  background-color: color-mix(in srgb, var(--kiut-bg-secondary) 88%, var(--kiut-primary) 12%); */

.kiut-table-comparative {
  font-family: var(--kiut-table-font, "Inter", system-ui, sans-serif);
  border-collapse: separate;
  border-spacing: 0;
  --kiut-table-comparative-thead-h: 2.75rem;
}

.kiut-table-comparative-scroll {
  overscroll-behavior: contain;
  scrollbar-gutter: stable;
}

.kiut-table-comparative__head-cell,
.kiut-table-comparative__head-corner {
  position: sticky;
  top: 0;
  z-index: 20;
  background-color: var(--kiut-bg-secondary);
  box-shadow: inset 0 -1px 0 var(--kiut-border-light, #e5e7eb);
}

.kiut-table-comparative__head-corner {
  left: 0;
  z-index: 30;
}

.kiut-table-comparative__category-cell {
  position: sticky;
  top: var(--kiut-table-comparative-thead-h);
  z-index: 16;
  background-color: var(--kiut-comparative-header);
  box-shadow: inset 0 -1px 0 var(--kiut-border-light, #e5e7eb);
}

.kiut-table-comparative__category-cell--label {
  left: 0;
  z-index: 19;
}

.kiut-table-comparative__category-cell--fill {
  padding-left: 0;
  padding-right: 0;
}

.kiut-table-comparative__group-btn {
  margin: 0;
  padding: 0.15rem 0.25rem;
  border: none;
  background: transparent;
  font: inherit;
  color: inherit;
  cursor: pointer;
  border-radius: 0.375rem;
  text-align: left;
}

.kiut-table-comparative__row-label {
  position: sticky;
  left: 0;
  z-index: 10;
  background-color: var(--kiut-bg-secondary);
}

.kiut-table-comparative__row-data {
  position: relative;
}

.kiut-table-comparative__metric-row.is-active
  .kiut-table-comparative__row-label::before,
.kiut-table-comparative__metric-row.is-active
  .kiut-table-comparative__row-data::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background-color: color-mix(
    in srgb,
    var(--kiut-bg-secondary) 88%,
    var(--kiut-primary) 12%
  );
}

.kiut-table-comparative__metric-row.is-active
  .kiut-table-comparative__row-label
  > *,
.kiut-table-comparative__metric-row.is-active
  .kiut-table-comparative__row-data
  > * {
  position: relative;
  z-index: 1;
}

@media (prefers-reduced-motion: reduce) {
  .kiut-table-comparative__group-btn :deep(svg) {
    transition: none;
  }
}
</style>
