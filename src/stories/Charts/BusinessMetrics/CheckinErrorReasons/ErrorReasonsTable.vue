<template>
  <div class="error-reasons-table-wrap table-section">
    <Table
      :columns="columns"
      :rows="displayedRows"
      row-key="id"
      expandable
      expand-column-key="category_label"
      fixed-layout
      :expanded-keys="expandedKeys"
      @update:expanded-keys="expandedKeys = $event"
    >
      <template #cell-category_label="{ row, depth }">
        <span
          :class="[
            'category-cell',
            depth === 0 ? 'category-cell--parent' : 'category-cell--child',
          ]"
        >
          {{ row.category_label }}
        </span>
      </template>
      <template #cell-error_count="{ row }">
        <span class="metric-cell">{{ formatNumber(Number(row.error_count)) }}</span>
      </template>
      <template #cell-percentage="{ row }">
        <span class="metric-cell">{{ formatPercentage(Number(row.percentage)) }}</span>
      </template>
    </Table>

    <button
      v-if="hasMoreRows"
      type="button"
      class="view-more-btn"
      @click="showAllRows = !showAllRows"
    >
      {{ showAllRows ? "View less" : `View more (${hiddenCount} rows)` }}
      <svg
        class="view-more-icon"
        :class="{ 'view-more-icon-rotated': showAllRows }"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import Table, { type TableColumn } from "../../../../components/Table/Table.vue";
import type { ErrorReasonTableRow } from "./CheckinErrorReasons.vue";

const MAX_VISIBLE_ROWS = 5;

const props = defineProps<{
  rows: ErrorReasonTableRow[];
}>();

const columns: TableColumn[] = [
  {
    key: "category_label",
    label: "Reason",
    align: "left",
    headerClass: "w-[58%]",
    cellClass: "error-reasons-label-cell",
  },
  {
    key: "error_count",
    label: "Errors",
    align: "center",
    headerClass: "w-[16%]",
    cellClass: "error-reasons-metric-cell",
  },
  {
    key: "percentage",
    label: "%",
    align: "center",
    headerClass: "w-[16%]",
    cellClass: "error-reasons-metric-cell",
  },
];

const showAllRows = ref(false);
const expandedKeys = ref<string[]>([]);

watch(
  () => props.rows,
  () => {
    showAllRows.value = false;
    expandedKeys.value = [];
  },
);

const rowCount = computed(() => props.rows.length);
const hasMoreRows = computed(() => rowCount.value > MAX_VISIBLE_ROWS);
const hiddenCount = computed(() => Math.max(0, rowCount.value - MAX_VISIBLE_ROWS));

const displayedRows = computed((): Record<string, unknown>[] => {
  const source =
    showAllRows.value || !hasMoreRows.value
      ? props.rows
      : props.rows.slice(0, MAX_VISIBLE_ROWS);
  return source as unknown as Record<string, unknown>[];
});

const formatNumber = (value: number): string => value.toLocaleString();

const formatPercentage = (value: number): string => `${value.toFixed(1)}%`;
</script>

<style scoped>
@import "../view-more-cta.css";

.error-reasons-table-wrap {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 0;
}

.error-reasons-table-wrap :deep(.kiut-table-wrap){
  border: none;
  border-radius: 8px;
  background-color: transparent;
  box-shadow: none;
}

.error-reasons-table-wrap :deep(.table-header){
  background-color: transparent;
  height: 1.5rem;
}

.error-reasons-table-wrap :deep(.kiut-table tbody .kiut-table-body-row) {
  height: auto;
}

.error-reasons-table-wrap :deep(.kiut-table tbody td.kiut-table-body-cell) {
  height: auto;
  max-height: none;
  padding-top: 0.375rem;
  padding-bottom: 0.375rem;
  vertical-align: middle;
}

.error-reasons-table-wrap :deep(.kiut-table tbody td.kiut-table-body-cell .icon_chevron) {
  height: 1rem;
  width: 1rem;
  margin: 0px 5px;
}

.error-reasons-table-wrap :deep(.kiut-table tbody .kiut-table-row--child),
.error-reasons-table-wrap :deep(.kiut-table tbody .kiut-table-row--child .metric-cell) {
  color: var(--kiut-text-secondary);
}

.error-reasons-table-wrap :deep(.kiut-table-body-cell .flex.items-start) {
  align-items: center;
}

.error-reasons-table-wrap :deep(.error-reasons-label-cell) {
  overflow: visible;
  white-space: normal;
}

.error-reasons-table-wrap :deep(.error-reasons-metric-cell) {
  white-space: nowrap;
}

.category-cell {
  display: block;
  min-width: 0;
  white-space: normal;
  overflow-wrap: anywhere;
  word-break: break-word;
  line-height: 1.45;
}

.category-cell--parent {
  font-weight: 600;
  color: var(--kiut-text-primary);
}

.category-cell--child {
  font-size: 0.8125rem;
  color: var(--kiut-text-secondary);
}

.metric-cell {
  font-weight: 500;
  color: var(--kiut-text-primary);
}
</style>
