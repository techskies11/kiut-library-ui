<template>
  <div
    class="kiut-table-versions-wrap overflow-hidden rounded-xl border border-[#e5e7eb] bg-[color:var(--kiut-bg-secondary)] shadow-sm dark:border-[color:var(--kiut-border-light)]"
  >
    <div class="w-full overflow-x-auto overflow-y-auto md:overflow-y-hidden">
      <table
        class="kiut-table-versions w-full min-w-[960px] table-fixed border-collapse text-left text-sm"
      >
        <thead>
          <tr
            class="h-12 border-b border-[#e5e7eb] bg-[#eaeaec80] dark:border-[color:var(--kiut-border-light)] dark:bg-[#23232f80]"
          >
            <th
              scope="col"
              class="w-28 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-[color:var(--kiut-text-table-header)]"
            >
              {{ labels.method }}
            </th>
            <th
              scope="col"
              class="min-w-0 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-[color:var(--kiut-text-table-header)]"
            >
              {{ labels.name }}
            </th>
            <th
              scope="col"
              class="min-w-0 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-[color:var(--kiut-text-table-header)]"
            >
              {{ labels.url }}
            </th>
            <th
              scope="col"
              class="w-32 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-[color:var(--kiut-text-table-header)]"
            >
              {{ labels.status }}
            </th>
            <th
              scope="col"
              class="w-20 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-[color:var(--kiut-text-table-header)]"
            >
              {{ labels.version }}
            </th>
            <th
              scope="col"
              class="w-28 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-[color:var(--kiut-text-table-header)]"
            >
              {{ labels.updated }}
            </th>
            <th
              scope="col"
              class="w-28 px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-[color:var(--kiut-text-table-header)]"
            >
              {{ labels.actions }}
            </th>
          </tr>
        </thead>
        <tbody>
          <template v-for="(row, index) in rows" :key="resolveRowKey(row, index)">
            <tr
              class="h-14 border-b border-[#e5e7eb] bg-transparent transition-colors hover:[background:var(--kiut-bg-table-hover)] dark:border-[color:var(--kiut-border-light)] dark:bg-[#141419]"
            >
              <td class="px-4 py-3 align-middle">
                <div class="flex items-center gap-1.5">
                  <button
                    type="button"
                    class="kiut-table-versions-expand-btn shrink-0"
                    :aria-expanded="isExpanded(row, index)"
                    :aria-label="isExpanded(row, index) ? labels.collapseRow : labels.expandRow"
                    @click="toggleExpand(row, index)"
                  >
                    <ChevronDownIcon
                      class="h-4 w-4 text-[color:var(--kiut-text-muted)] transition-transform duration-200"
                      :class="{ '-rotate-90': !isExpanded(row, index) }"
                      aria-hidden="true"
                    />
                  </button>
                  <span
                    class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold"
                    :class="methodBadgeClass(row.method)"
                  >
                    {{ row.method }}
                  </span>
                </div>
              </td>
              <td class="min-w-0 px-4 py-3 align-middle">
                <div class="min-w-0">
                  <p class="truncate font-medium text-[color:var(--kiut-text-primary)]">
                    {{ row.name }}
                  </p>
                  <p
                    v-if="row.description"
                    class="truncate text-xs text-[color:var(--kiut-text-muted)]"
                  >
                    {{ row.description }}
                  </p>
                </div>
              </td>
              <td class="min-w-0 px-4 py-3 align-middle">
                <span
                  class="block truncate font-mono text-xs text-[color:var(--kiut-text-secondary)]"
                  :title="row.url"
                >
                  {{ row.url }}
                </span>
              </td>
              <td class="px-4 py-3 align-middle">
                <Tag :color="endpointStatusColor(row.status)" :outlined="false">
                  {{ row.status }}
                </Tag>
              </td>
              <td class="px-4 py-3 align-middle text-[color:var(--kiut-text-secondary)]">
                {{ row.version }}
              </td>
              <td class="whitespace-nowrap px-4 py-3 align-middle text-xs text-[color:var(--kiut-text-secondary)]">
                {{ formatDate(row.updatedAt) }}
              </td>
              <td class="px-4 py-3 align-middle">
                <div class="flex items-center justify-end gap-1">
                  <Button
                    variant="action"
                    :tooltip="labels.view"
                    :aria-label="labels.view"
                    @click="emit('view', row)"
                  >
                    <template #icon>
                      <EyeIcon class="h-4 w-4" />
                    </template>
                  </Button>
                  <Button
                    variant="action"
                    :tooltip="labels.run"
                    :aria-label="labels.run"
                    @click="emit('run', row)"
                  >
                    <template #icon>
                      <PlayIcon class="h-4 w-4" />
                    </template>
                  </Button>
                  <Button
                    variant="action"
                    :tooltip="labels.edit"
                    :aria-label="labels.edit"
                    @click="emit('edit', row)"
                  >
                    <template #icon>
                      <PencilSquareIcon class="h-4 w-4" />
                    </template>
                  </Button>
                </div>
              </td>
            </tr>
            <tr
              v-if="isExpanded(row, index)"
              class="border-b border-[#e5e7eb] bg-[#f9fafb] dark:border-[color:var(--kiut-border-light)] dark:bg-[#1a1a22]"
            >
              <td colspan="7" class="px-4 pb-4 pt-1">
                <h4
                  class="mb-2 text-xs font-semibold uppercase tracking-wide text-[color:var(--kiut-text-muted)]"
                >
                  {{ labels.historialTitle }}
                </h4>
                <p
                  v-if="!row.versions?.length"
                  class="text-sm text-[color:var(--kiut-text-muted)]"
                >
                  {{ labels.emptyHistory }}
                </p>
                <div v-else class="space-y-2">
                  <div
                    v-for="version in row.versions"
                    :key="version.id"
                    class="flex flex-wrap items-center gap-3 rounded-lg border border-[#e5e7eb] bg-[color:var(--kiut-bg-secondary)] px-4 py-3 dark:border-[color:var(--kiut-border-light)]"
                  >
                    <Tag color="neutral" outlined>
                      {{ version.status }}
                    </Tag>
                    <span class="text-sm font-medium text-[color:var(--kiut-text-primary)]">
                      {{ version.version }}
                    </span>
                    <span
                      class="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold"
                      :class="methodBadgeClass(version.method)"
                    >
                      {{ version.method }}
                    </span>
                    <span
                      class="min-w-0 flex-1 truncate font-mono text-xs text-[color:var(--kiut-text-secondary)]"
                      :title="version.url"
                    >
                      {{ version.url }}
                    </span>
                    <span class="whitespace-nowrap text-xs text-[color:var(--kiut-text-muted)]">
                      {{ formatDateTime(version.updatedAt) }}
                    </span>
                    <div class="ml-auto flex shrink-0 items-center gap-2">
                      <Button
                        variant="secondary"
                        class="!min-h-8 !px-3 !py-1.5 !text-xs"
                        @click="emit('viewVersion', version, row)"
                      >
                        <template #icon>
                          <EyeIcon class="h-4 w-4" />
                        </template>
                        {{ labels.viewVersion }}
                      </Button>
                      <Button
                        variant="secondary"
                        class="!min-h-8 !px-3 !py-1.5 !text-xs"
                        @click="emit('createDraft', version, row)"
                      >
                        <template #icon>
                          <DocumentDuplicateIcon class="h-4 w-4" />
                        </template>
                        {{ labels.createDraft }}
                      </Button>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ChevronDownIcon,
  DocumentDuplicateIcon,
  EyeIcon,
  PencilSquareIcon,
  PlayIcon,
} from '@heroicons/vue/24/outline';
import { computed, ref } from 'vue';
import Button from '../Button/Button.vue';
import Tag, { type KiutTagColor } from '../Tag/Tag.vue';
import {
  DEFAULT_TABLE_VERSIONS_LABELS,
  type EndpointStatus,
  type HttpMethod,
  type TableVersionsHistoryItem,
  type TableVersionsLabels,
  type TableVersionsRow,
} from './tableVersionsTypes';

defineOptions({ name: 'TableVersions' });

export type {
  EndpointStatus,
  HttpMethod,
  TableVersionsHistoryItem,
  TableVersionsLabels,
  TableVersionsRow,
  VersionStatus,
} from './tableVersionsTypes';

const props = withDefaults(
  defineProps<{
    rows: TableVersionsRow[];
    rowKey?: string | ((row: TableVersionsRow) => string);
    expandedKeys?: string[];
    defaultExpandedKeys?: string[];
    singleExpand?: boolean;
    labels?: Partial<TableVersionsLabels>;
  }>(),
  {
    rows: () => [],
    rowKey: 'id',
    expandedKeys: undefined,
    defaultExpandedKeys: () => [],
    singleExpand: false,
    labels: () => ({}),
  },
);

const emit = defineEmits<{
  'update:expandedKeys': [keys: string[]];
  expand: [key: string, row: TableVersionsRow];
  collapse: [key: string, row: TableVersionsRow];
  view: [row: TableVersionsRow];
  run: [row: TableVersionsRow];
  edit: [row: TableVersionsRow];
  viewVersion: [version: TableVersionsHistoryItem, parentRow: TableVersionsRow];
  createDraft: [version: TableVersionsHistoryItem, parentRow: TableVersionsRow];
}>();

const internalExpandedKeys = ref<string[]>([...props.defaultExpandedKeys]);

const expandedKeysModel = computed({
  get(): string[] {
    return props.expandedKeys ?? internalExpandedKeys.value;
  },
  set(keys: string[]): void {
    internalExpandedKeys.value = keys;
    emit('update:expandedKeys', keys);
  },
});

const labels = computed((): TableVersionsLabels => ({
  ...DEFAULT_TABLE_VERSIONS_LABELS,
  ...props.labels,
}));

const METHOD_BADGE_CLASSES: Record<HttpMethod, string> = {
  GET: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  POST: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  PUT: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  PATCH: 'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300',
  DELETE: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
};

function resolveRowKey(row: TableVersionsRow, index: number): string {
  if (typeof props.rowKey === 'function') {
    return props.rowKey(row);
  }
  const raw = row[props.rowKey as keyof TableVersionsRow];
  if (raw !== undefined && raw !== null) return String(raw);
  return `__index_${index}`;
}

function isExpanded(row: TableVersionsRow, index: number): boolean {
  return expandedKeysModel.value.includes(resolveRowKey(row, index));
}

function toggleExpand(row: TableVersionsRow, index: number): void {
  const key = resolveRowKey(row, index);
  const set = new Set(expandedKeysModel.value);

  if (set.has(key)) {
    set.delete(key);
    emit('collapse', key, row);
  } else {
    if (props.singleExpand) {
      set.clear();
    }
    set.add(key);
    emit('expand', key, row);
  }

  expandedKeysModel.value = [...set];
}

function methodBadgeClass(method: HttpMethod): string {
  return (
    METHOD_BADGE_CLASSES[method] ??
    'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300'
  );
}

function endpointStatusColor(status: EndpointStatus): KiutTagColor {
  if (status === 'published') return 'success';
  return 'warning';
}

function formatDate(value: string | Date): string {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return date.toLocaleDateString('es-ES');
}

function formatDateTime(value: string | Date): string {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return date.toLocaleString('es-ES');
}
</script>

<style scoped>
.kiut-table-versions {
  font-family: var(--kiut-table-font, 'Inter', system-ui, sans-serif);
}

.kiut-table-versions-expand-btn {
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

.kiut-table-versions-expand-btn:focus-visible {
  outline: 2px solid var(--kiut-primary-light, #a78bfa);
  outline-offset: 2px;
}

@media (prefers-reduced-motion: reduce) {
  .kiut-table-versions-expand-btn :deep(svg) {
    transition: none;
  }
}
</style>
