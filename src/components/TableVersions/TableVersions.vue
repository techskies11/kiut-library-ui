<template>
  <div
    class="kiut-table-versions-wrap overflow-hidden rounded-xl border border-[#e5e7eb] bg-[color:var(--kiut-bg-secondary)] shadow-sm dark:border-[color:var(--kiut-border-light)]"
  >
    <div class="w-full overflow-x-auto overflow-y-auto md:overflow-y-hidden">
      <table
        class="kiut-table-versions w-full min-w-[640px] table-fixed border-collapse text-left text-sm"
      >
        <thead>
          <tr
            class="h-12 border-b border-[#e5e7eb] bg-[#eaeaec80] dark:border-[color:var(--kiut-border-light)] dark:bg-[#23232f80]"
          >
            <th
              v-for="col in columns"
              :key="col.key"
              scope="col"
              :class="[
                'px-4 py-3 text-xs font-semibold uppercase tracking-wide text-[color:var(--kiut-text-table-header)]',
                alignClass(col.align),
                col.headerClass ?? '',
              ]"
            >
              {{ columnLabel(col) }}
            </th>
          </tr>
        </thead>
        <tbody>
          <template v-for="(row, index) in rows" :key="resolveRowKey(row, index)">
            <tr
              class="h-14 border-b border-[#e5e7eb] bg-transparent transition-colors hover:[background:var(--kiut-bg-table-hover)] dark:border-[color:var(--kiut-border-light)] dark:bg-[#141419]"
            >
              <td
                v-for="col in columns"
                :key="col.key"
                :class="[
                  'px-4 py-3 align-middle text-[color:var(--kiut-text-secondary)]',
                  alignClass(col.align),
                  col.cellClass ?? '',
                ]"
              >
                <slot
                  :name="cellSlotName(col.key)"
                  v-bind="cellSlotProps(row, col, index)"
                >
                  <div
                    v-if="isExpandColumn(col.key)"
                    class="flex min-w-0 items-center gap-1.5"
                  >
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
                    <div class="min-w-0 flex-1">
                      <component :is="() => renderBuiltInCell(row, col, index)" />
                    </div>
                  </div>
                  <component
                    v-else
                    :is="() => renderBuiltInCell(row, col, index)"
                  />
                </slot>
              </td>
            </tr>
            <tr
              v-if="isExpanded(row, index)"
              class="border-b border-[#e5e7eb] bg-[#f9fafb] dark:border-[color:var(--kiut-border-light)] dark:bg-[#1a1a22]"
            >
              <td :colspan="columns.length" class="px-4 pb-4 pt-1">
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
                    <slot
                      name="history-item"
                      :version="version"
                      :row="row"
                    >
                      <Tag color="neutral" outlined>
                        {{ version.status }}
                      </Tag>
                      <span class="text-sm font-medium text-[color:var(--kiut-text-primary)]">
                        {{ version.version }}
                      </span>
                      <span
                        v-if="version.method"
                        class="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold"
                        :class="methodBadgeClass(version.method)"
                      >
                        {{ version.method }}
                      </span>
                      <span
                        v-if="version.url"
                        class="min-w-0 flex-1 truncate font-mono text-xs text-[color:var(--kiut-text-secondary)]"
                        :title="version.url"
                      >
                        {{ version.url }}
                      </span>
                      <span class="whitespace-nowrap text-xs text-[color:var(--kiut-text-muted)]">
                        {{ formatDateTime(version.updatedAt) }}
                      </span>
                    </slot>
                    <div class="ml-auto flex shrink-0 items-center gap-2">
                      <slot
                        name="history-actions"
                        :version="version"
                        :row="row"
                      >
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
                          @click="emit('createDraftFromVersion', version, row)"
                        >
                          <template #icon>
                            <DocumentDuplicateIcon class="h-4 w-4" />
                          </template>
                          {{ labels.createDraftFromVersion }}
                        </Button>
                      </slot>
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
  TrashIcon,
} from '@heroicons/vue/24/outline';
import { computed, h, ref, type VNode } from 'vue';
import Button from '../Button/Button.vue';
import Toggle from '../Inputs/Toggle.vue';
import Tag, { type KiutTagColor } from '../Tag/Tag.vue';
import {
  DEFAULT_TABLE_VERSIONS_LABELS,
  ENDPOINT_TABLE_VERSIONS_COLUMNS,
  type EndpointStatus,
  type HttpMethod,
  type TableVersionsColumn,
  type TableVersionsColumnAlign,
  type TableVersionsHistoryItem,
  type TableVersionsLabels,
  type TableVersionsRow,
  type TableVersionsRowAction,
} from './tableVersionsTypes';

defineOptions({ name: 'TableVersions' });

export type {
  EndpointStatus,
  HttpMethod,
  TableVersionsColumn,
  TableVersionsColumnAlign,
  TableVersionsColumnType,
  TableVersionsHistoryItem,
  TableVersionsLabels,
  TableVersionsRow,
  TableVersionsRowAction,
  VersionStatus,
} from './tableVersionsTypes';

export interface TableVersionsCellSlotProps {
  row: TableVersionsRow;
  column: TableVersionsColumn;
  index: number;
  expanded: boolean;
}

const props = withDefaults(
  defineProps<{
    rows: TableVersionsRow[];
    columns?: TableVersionsColumn[];
    rowKey?: string | ((row: TableVersionsRow) => string);
    expandedKeys?: string[];
    defaultExpandedKeys?: string[];
    singleExpand?: boolean;
    /** Columna que muestra el chevron de expansión. Default: primera columna. */
    expandColumnKey?: string;
    labels?: Partial<TableVersionsLabels>;
  }>(),
  {
    rows: () => [],
    columns: () => ENDPOINT_TABLE_VERSIONS_COLUMNS,
    rowKey: 'id',
    expandedKeys: undefined,
    defaultExpandedKeys: () => [],
    singleExpand: false,
    expandColumnKey: undefined,
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
  delete: [row: TableVersionsRow];
  createDraft: [row: TableVersionsRow];
  toggleActive: [row: TableVersionsRow, active: boolean];
  viewVersion: [version: TableVersionsHistoryItem, parentRow: TableVersionsRow];
  createDraftFromVersion: [version: TableVersionsHistoryItem, parentRow: TableVersionsRow];
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

const effectiveExpandColumnKey = computed(
  () => props.expandColumnKey ?? props.columns[0]?.key ?? '',
);

const METHOD_BADGE_CLASSES: Record<HttpMethod, string> = {
  GET: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  POST: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  PUT: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  PATCH: 'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300',
  DELETE: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
};

function cellSlotName(key: string): string {
  return `cell-${key}`;
}

function cellSlotProps(
  row: TableVersionsRow,
  column: TableVersionsColumn,
  index: number,
): TableVersionsCellSlotProps {
  return {
    row,
    column,
    index,
    expanded: isExpanded(row, index),
  };
}

function columnLabel(col: TableVersionsColumn): string {
  const key = col.key as keyof TableVersionsLabels;
  if (col.label) return col.label;
  if (key in labels.value) return labels.value[key];
  return col.key;
}

function alignClass(align: TableVersionsColumnAlign | undefined): string {
  if (align === 'center') return 'text-center';
  if (align === 'right') return 'text-right';
  return 'text-left';
}

function isExpandColumn(colKey: string): boolean {
  return colKey === effectiveExpandColumnKey.value;
}

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

function columnType(col: TableVersionsColumn): string {
  return col.type ?? col.key;
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

function renderNameCell(row: TableVersionsRow): VNode {
  return h('div', { class: 'min-w-0' }, [
    h(
      'p',
      { class: 'truncate font-medium text-[color:var(--kiut-text-primary)]' },
      row.name,
    ),
    row.description
      ? h(
          'p',
          { class: 'truncate text-xs text-[color:var(--kiut-text-muted)]' },
          row.description,
        )
      : null,
  ]);
}

function renderMethodCell(row: TableVersionsRow): VNode | null {
  if (!row.method) return null;
  return h(
    'span',
    {
      class: [
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold',
        methodBadgeClass(row.method),
      ],
    },
    row.method,
  );
}

function renderActionsCell(row: TableVersionsRow, col: TableVersionsColumn): VNode {
  const actions = col.actions ?? ['view', 'edit'];
  const buttons: VNode[] = [];

  for (const action of actions) {
    if (action === 'view') {
      buttons.push(
        h(
          Button,
          {
            variant: 'action',
            tooltip: labels.value.view,
            ariaLabel: labels.value.view,
            onClick: () => emit('view', row),
          },
          { icon: () => h(EyeIcon, { class: 'h-4 w-4' }) },
        ),
      );
    } else if (action === 'run') {
      buttons.push(
        h(
          Button,
          {
            variant: 'action',
            tooltip: labels.value.run,
            ariaLabel: labels.value.run,
            onClick: () => emit('run', row),
          },
          { icon: () => h(PlayIcon, { class: 'h-4 w-4' }) },
        ),
      );
    } else if (action === 'edit') {
      buttons.push(
        h(
          Button,
          {
            variant: 'action',
            tooltip: labels.value.edit,
            ariaLabel: labels.value.edit,
            onClick: () => emit('edit', row),
          },
          { icon: () => h(PencilSquareIcon, { class: 'h-4 w-4' }) },
        ),
      );
    } else if (action === 'createDraft') {
      buttons.push(
        h(
          Button,
          {
            variant: 'action',
            tooltip: labels.value.createDraft,
            ariaLabel: labels.value.createDraft,
            onClick: () => emit('createDraft', row),
          },
          { icon: () => h(DocumentDuplicateIcon, { class: 'h-4 w-4' }) },
        ),
      );
    } else if (action === 'delete') {
      buttons.push(
        h(
          Button,
          {
            variant: 'action',
            tone: 'danger',
            tooltip: labels.value.delete,
            ariaLabel: labels.value.delete,
            onClick: () => emit('delete', row),
          },
          { icon: () => h(TrashIcon, { class: 'h-4 w-4' }) },
        ),
      );
    }
  }

  return h(
    'div',
    { class: 'flex items-center justify-end gap-1' },
    buttons,
  );
}

function renderBuiltInCell(
  row: TableVersionsRow,
  col: TableVersionsColumn,
  _index: number,
): VNode | null {
  const type = columnType(col);

  switch (type) {
    case 'name':
      return renderNameCell(row);
    case 'method':
      return renderMethodCell(row);
    case 'url':
      return row.url
        ? h(
            'span',
            {
              class:
                'block truncate font-mono text-xs text-[color:var(--kiut-text-secondary)]',
              title: row.url,
            },
            row.url,
          )
        : null;
    case 'status':
      return h(
        Tag,
        { color: endpointStatusColor(row.status), outlined: false },
        () => row.status,
      );
    case 'version':
      return h('span', {}, row.version);
    case 'updated':
      return h(
        'span',
        { class: 'whitespace-nowrap text-xs' },
        formatDate(row.updatedAt),
      );
    case 'active':
      return h(Toggle, {
        modelValue: row.active ?? false,
        ariaLabel: labels.value.toggleActive,
        'onUpdate:modelValue': (value: boolean) => emit('toggleActive', row, value),
      });
    case 'actions':
      return renderActionsCell(row, col);
    default:
      return h('span', {}, String(row[col.key as keyof TableVersionsRow] ?? ''));
  }
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
