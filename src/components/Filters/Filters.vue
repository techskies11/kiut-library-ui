<template>
  <div
    class="kiut-filters font-[Inter] text-sm"
    role="region"
    :aria-label="regionAriaLabel"
  >
    <div class="flex flex-wrap items-center gap-x-2 gap-y-1.5">
      <span
        class="shrink-0 font-medium text-[color:var(--kiut-text-secondary)] dark:text-slate-400"
      >
        {{ label }}
      </span>

      <div class="flex min-w-0 flex-1 flex-wrap items-center gap-1.5">
        <!-- Chips activos -->
        <div
          v-for="def in activeDefinitions"
          :key="`chip-${def.id}`"
          data-kiut-filter-chip
          class="inline-flex max-w-full items-center gap-1 rounded-full border border-[color:var(--kiut-border-light)] bg-slate-100/90 py-0.5 pl-2 pr-1 text-[color:var(--kiut-text-primary)] dark:border-white/[0.08] dark:bg-white/[0.08] dark:text-slate-100"
        >
          <button
            type="button"
            class="min-w-0 flex-1 truncate text-left transition hover:opacity-90"
            :aria-label="chipAriaEdit(def)"
            @click="openChipPanel(def, $event)"
          >
            <slot name="formatChip" :filter="def" :value="valueFor(def.id)">
              {{ formatChipText(def) }}
            </slot>
          </button>
          <button
            type="button"
            class="shrink-0 rounded p-0.5 text-[color:var(--kiut-text-muted)] transition hover:bg-black/5 hover:text-[color:var(--kiut-text-primary)] dark:hover:bg-white/10 dark:hover:text-slate-100"
            :aria-label="removeAriaLabel(def)"
            @click="removeFilter(def.id)"
          >
            <XMarkIcon class="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </div>

        <!-- Pills para añadir -->
        <button
          v-for="def in availableDefinitions"
          :key="`add-${def.id}`"
          :ref="(el) => setTriggerRef(def.id, el)"
          type="button"
          class="inline-flex items-center gap-0.5 rounded-full border-1 border-dashed px-2 py-1 font-medium text-[color:var(--kiut-text-secondary)] transition-colors dark:text-slate-400"
          :class="addPillClass(def.id)"
          :aria-label="addFilterAriaLabel(def)"
          :aria-expanded="openFilterId === def.id"
          :aria-haspopup="true"
          :aria-controls="openFilterId === def.id ? panelId : undefined"
          @click="toggleAddPanel(def, $event)"
        >
          <PlusIcon class="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          <span>{{ def.label }}</span>
        </button>
      </div>

      <button
        v-if="hasActiveFilters"
        type="button"
        class="shrink-0 text-[color:var(--kiut-text-secondary)] underline-offset-2 transition hover:text-[color:var(--kiut-primary)] hover:underline dark:text-slate-400 dark:hover:text-[color:var(--kiut-primary-light)]"
        :aria-label="clearAriaLabel"
        @click="clearAll"
      >
        {{ clearLabel }}
      </button>
    </div>

    <Teleport to="body">
      <div
        v-if="openFilterId && panelOpen"
        :id="panelId"
        ref="panelRef"
        role="dialog"
        :aria-modal="true"
        :aria-label="panelAriaLabel"
        class="fixed z-[100] rounded-lg border border-[color:var(--kiut-border-light)] bg-[color:var(--kiut-bg-secondary)] p-3 shadow-lg dark:border-white/[0.08] dark:bg-[#252528]"
        :style="panelStyle"
        @keydown.stop
      >
        <template v-if="openDefinition">
          <slot
            v-if="$slots.panel"
            name="panel"
            :filter="openDefinition"
            :close="applyDraft"
            :value="draftValue"
            :update-value="updateDraft"
          />
          <template v-else>
            <div class="space-y-2">
              <template v-if="openDefinition.type === 'text'">
                <label
                  :for="`${panelId}-text`"
                  class="block text-xs font-medium leading-tight text-[color:var(--kiut-text-secondary)] dark:text-slate-400"
                >
                  {{ openDefinition.label }}
                </label>
                  <input
                    :id="`${panelId}-text`"
                    v-model="draftText"
                    type="text"
                    class="w-full rounded-md border border-[color:var(--kiut-border-table)] bg-white px-2 py-1.5 text-sm text-[color:var(--kiut-text-primary)] outline-none ring-[color:var(--kiut-primary)]/25 placeholder:text-[color:var(--kiut-text-muted)] focus:border-[color:var(--kiut-primary)] focus:ring-2 dark:border-white/[0.12] dark:bg-[#1e1e20] dark:text-slate-100 dark:placeholder:text-slate-500"
                    :placeholder="openDefinition.placeholder ?? '…'"
                    @keydown.enter.prevent="applyDraft"
                  />
              </template>

              <template v-else-if="openDefinition.type === 'select'">
                <label
                  :for="`${panelId}-select`"
                  class="block text-xs font-medium leading-tight text-[color:var(--kiut-text-secondary)] dark:text-slate-400"
                >
                  {{ openDefinition.label }}
                </label>
                  <select
                    :id="`${panelId}-select`"
                    v-model="draftSelect"
                    class="w-full rounded-md border border-[color:var(--kiut-border-table)] bg-white px-2 py-1.5 text-sm text-[color:var(--kiut-text-primary)] outline-none ring-[color:var(--kiut-primary)]/25 focus:border-[color:var(--kiut-primary)] focus:ring-2 dark:border-white/[0.12] dark:bg-[#1e1e20] dark:text-slate-100"
                  >
                  <option value="" disabled>{{ openDefinition.placeholder ?? 'Seleccionar…' }}</option>
                  <option
                    v-for="opt in openDefinition.options"
                    :key="opt.value"
                    :value="opt.value"
                  >
                    {{ opt.label }}
                  </option>
                </select>
              </template>

              <template v-else-if="openDefinition.type === 'dateRange'">
                <p class="text-xs font-medium leading-tight text-[color:var(--kiut-text-secondary)] dark:text-slate-400">
                  {{ openDefinition.label }}
                </p>
                <div class="flex flex-wrap items-end gap-2">
                  <div class="min-w-[120px] flex-1">
                    <label
                      :for="`${panelId}-start`"
                      class="mb-0.5 block text-xs leading-tight text-[color:var(--kiut-text-muted)]"
                    >
                      Desde
                    </label>
                    <input
                      :id="`${panelId}-start`"
                      v-model="draftRangeStart"
                      type="date"
                      class="w-full rounded-md border border-[color:var(--kiut-border-table)] bg-white px-1.5 py-1.5 text-sm text-[color:var(--kiut-text-primary)] outline-none focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 dark:border-white/[0.12] dark:bg-[#1e1e20] dark:text-slate-100"
                    />
                  </div>
                  <div class="min-w-[120px] flex-1">
                    <label
                      :for="`${panelId}-end`"
                      class="mb-0.5 block text-xs leading-tight text-[color:var(--kiut-text-muted)]"
                    >
                      Hasta
                    </label>
                    <input
                      :id="`${panelId}-end`"
                      v-model="draftRangeEnd"
                      type="date"
                      class="w-full rounded-md border border-[color:var(--kiut-border-table)] bg-white px-1.5 py-1.5 text-sm text-[color:var(--kiut-text-primary)] outline-none focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 dark:border-white/[0.12] dark:bg-[#1e1e20] dark:text-slate-100"
                    />
                  </div>
                </div>
              </template>
            </div>
          </template>
        </template>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { PlusIcon, XMarkIcon } from '@heroicons/vue/20/solid';
import moment from 'moment';
import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  useSlots,
  watch,
} from 'vue';
import { randomInstanceSuffix } from '../../utils/randomId';

defineOptions({ name: 'Filters' });

export interface FilterOption {
  value: string;
  label: string;
}

export interface FilterDefinitionText {
  id: string;
  label: string;
  type: 'text';
  placeholder?: string;
}

export interface FilterDefinitionSelect {
  id: string;
  label: string;
  type: 'select';
  options: FilterOption[];
  placeholder?: string;
}

export interface FilterDefinitionDateRange {
  id: string;
  label: string;
  type: 'dateRange';
}

export type FilterDefinition =
  | FilterDefinitionText
  | FilterDefinitionSelect
  | FilterDefinitionDateRange;

export type FiltersModelValue = Record<string, unknown>;

const props = withDefaults(
  defineProps<{
    filterDefinitions: FilterDefinition[];
    modelValue: FiltersModelValue;
    label?: string;
    clearLabel?: string;
    regionAriaLabel?: string;
  }>(),
  {
    label: 'Filtros:',
    clearLabel: 'Limpiar filtros',
    regionAriaLabel: 'Filtros',
  }
);

const emit = defineEmits<{
  'update:modelValue': [value: FiltersModelValue];
  change: [value: FiltersModelValue];
}>();

const slots = useSlots();

const uid = `kiut-filters-${randomInstanceSuffix()}`;
const panelId = `${uid}-panel`;

const panelRef = ref<HTMLElement | null>(null);
const triggerRefs = new Map<string, HTMLElement | null>();
const openFilterId = ref<string | null>(null);
const panelOpen = ref(false);
const panelStyle = ref<Record<string, string>>({});
const panelAnchorEl = ref<HTMLElement | null>(null);

const draftText = ref('');
const draftSelect = ref('');
const draftRangeStart = ref('');
const draftRangeEnd = ref('');

const openDefinition = computed(() => {
  if (!openFilterId.value) return null;
  return props.filterDefinitions.find((d) => d.id === openFilterId.value) ?? null;
});

const draftValue = computed(() => {
  const def = openDefinition.value;
  if (!def) return undefined;
  if (def.type === 'text') return draftText.value;
  if (def.type === 'select') return draftSelect.value;
  return { start: draftRangeStart.value, end: draftRangeEnd.value };
});

function setTriggerRef(id: string, el: unknown) {
  if (el && el instanceof HTMLElement) triggerRefs.set(id, el);
  else triggerRefs.delete(id);
}

function valueFor(id: string): unknown {
  return props.modelValue[id];
}

function isEmptyForDefinition(def: FilterDefinition, v: unknown): boolean {
  if (v === undefined || v === null) return true;
  if (def.type === 'text') return String(v).trim() === '';
  if (def.type === 'select') return String(v).trim() === '';
  if (def.type === 'dateRange') {
    const o = v as { start?: string; end?: string };
    return !o?.start?.trim() || !o?.end?.trim();
  }
  return true;
}

const hasActiveFilters = computed(() =>
  props.filterDefinitions.some((d) => !isEmptyForDefinition(d, valueFor(d.id)))
);

const activeDefinitions = computed(() =>
  props.filterDefinitions.filter((d) => !isEmptyForDefinition(d, valueFor(d.id)))
);

const availableDefinitions = computed(() =>
  props.filterDefinitions.filter((d) => isEmptyForDefinition(d, valueFor(d.id)))
);

function formatChipText(def: FilterDefinition): string {
  const v = valueFor(def.id);
  const base = def.label.replace(/^\+\s*/, '');
  if (def.type === 'text') return `${base}: ${String(v ?? '').trim()}`;
  if (def.type === 'select') {
    const s = String(v ?? '');
    const opt = def.options.find((o) => o.value === s);
    return `${base}: ${opt?.label ?? s}`;
  }
  const r = v as { start: string; end: string };
  const a = formatDateShort(r.start);
  const b = formatDateShort(r.end);
  return `${base}: ${a} – ${b}`;
}

function formatDateShort(iso: string): string {
  if (!iso) return '';
  const m = moment(iso, 'YYYY-MM-DD', true);
  return m.isValid() ? m.format('L') : iso;
}

function addPillClass(id: string): string {
  if (openFilterId.value === id && panelOpen.value) {
    return 'border-solid border-[color:var(--kiut-primary)] bg-[color:var(--kiut-primary)]/10 text-[color:var(--kiut-primary-default)] dark:border-[color:var(--kiut-primary-light)] dark:bg-[color:var(--kiut-primary)]/15 dark:text-[color:var(--kiut-primary-light)]';
  }
  return 'border-slate-400/90 hover:border-[color:var(--kiut-primary)]/50 hover:bg-slate-50 dark:border-slate-500 dark:hover:border-[color:var(--kiut-primary-light)]/40 dark:hover:bg-white/[0.04]';
}

function syncDraftFromValue(def: FilterDefinition) {
  const v = valueFor(def.id);
  if (def.type === 'text') {
    draftText.value = v !== undefined && v !== null ? String(v) : '';
    return;
  }
  if (def.type === 'select') {
    draftSelect.value = v !== undefined && v !== null ? String(v) : '';
    return;
  }
  const r = v as { start?: string; end?: string } | undefined;
  draftRangeStart.value = r?.start?.trim() ?? '';
  draftRangeEnd.value = r?.end?.trim() ?? '';
}

function positionPanel(triggerEl: HTMLElement | null) {
  if (!triggerEl) return;
  panelAnchorEl.value = triggerEl;
  const r = triggerEl.getBoundingClientRect();
  const panelW = 300;
  let left = r.left;
  const maxLeft = window.innerWidth - panelW - 12;
  if (left > maxLeft) left = Math.max(12, maxLeft);
  if (left < 12) left = 12;
  const top = r.bottom + 8;
  panelStyle.value = {
    top: `${top}px`,
    left: `${left}px`,
    width: `${Math.min(panelW, window.innerWidth - 24)}px`,
  };
}

function openChipPanel(def: FilterDefinition, ev: MouseEvent) {
  if (openFilterId.value === def.id && panelOpen.value) {
    applyDraft();
    return;
  }
  if (panelOpen.value && openFilterId.value !== def.id) {
    applyDraft();
  }
  openFilterId.value = def.id;
  panelOpen.value = true;
  syncDraftFromValue(def);
  void nextTick().then(async () => {
    positionPanel(ev.currentTarget as HTMLElement);
    await nextTick();
    focusPanelFirstControl();
  });
}

function toggleAddPanel(def: FilterDefinition, ev: MouseEvent) {
  if (openFilterId.value === def.id && panelOpen.value) {
    applyDraft();
    return;
  }
  if (panelOpen.value && openFilterId.value !== def.id) {
    applyDraft();
  }
  openFilterId.value = def.id;
  panelOpen.value = true;
  syncDraftFromValue(def);
  void nextTick().then(async () => {
    const trigger = triggerRefs.get(def.id) ?? (ev.currentTarget as HTMLElement);
    positionPanel(trigger);
    await nextTick();
    focusPanelFirstControl();
  });
}

function focusPanelFirstControl() {
  const root = panelRef.value;
  if (!root) return;
  const focusable = root.querySelector<HTMLElement>(
    'input, select, button, [href], textarea, [tabindex]:not([tabindex="-1"])'
  );
  focusable?.focus();
}

function closePanel() {
  panelOpen.value = false;
  openFilterId.value = null;
  panelAnchorEl.value = null;
}

function updateDraft(v: unknown) {
  const def = openDefinition.value;
  if (!def) return;
  if (def.type === 'text') {
    draftText.value = v !== undefined && v !== null ? String(v) : '';
    return;
  }
  if (def.type === 'select') {
    draftSelect.value = v !== undefined && v !== null ? String(v) : '';
    return;
  }
  const o = v as { start?: string; end?: string };
  draftRangeStart.value = o?.start?.trim() ?? '';
  draftRangeEnd.value = o?.end?.trim() ?? '';
}

function applyDraft() {
  const def = openDefinition.value;
  if (!def) return;

  if (def.type === 'text') {
    const t = draftText.value.trim();
    const next = { ...props.modelValue };
    if (t === '') delete next[def.id];
    else next[def.id] = t;
    emit('update:modelValue', next);
    emit('change', next);
    closePanel();
    return;
  }

  if (def.type === 'select') {
    const s = draftSelect.value.trim();
    const next = { ...props.modelValue };
    if (s === '') delete next[def.id];
    else next[def.id] = s;
    emit('update:modelValue', next);
    emit('change', next);
    closePanel();
    return;
  }

  const start = draftRangeStart.value.trim();
  const end = draftRangeEnd.value.trim();
  const next = { ...props.modelValue };
  if (!start || !end || start > end) {
    delete next[def.id];
  } else {
    next[def.id] = { start, end };
  }
  emit('update:modelValue', next);
  emit('change', next);
  closePanel();
}

function removeFilter(id: string) {
  const next = { ...props.modelValue };
  delete next[id];
  emit('update:modelValue', next);
  emit('change', next);
  if (openFilterId.value === id) closePanel();
}

function clearAll() {
  const next: FiltersModelValue = {};
  emit('update:modelValue', next);
  emit('change', next);
  closePanel();
}

const panelAriaLabel = computed(() => {
  const d = openDefinition.value;
  return d ? `Editar filtro: ${d.label}` : 'Filtro';
});

function removeAriaLabel(def: FilterDefinition): string {
  return `Quitar filtro ${def.label.replace(/^\+\s*/, '')}`;
}

function chipAriaEdit(def: FilterDefinition): string {
  return `Editar filtro ${def.label.replace(/^\+\s*/, '')}`;
}

function addFilterAriaLabel(def: FilterDefinition): string {
  return `Añadir filtro ${def.label.replace(/^\+\s*/, '')}`;
}

const clearAriaLabel = computed(() => props.clearLabel);

function onDocPointerDown(ev: MouseEvent) {
  if (!panelOpen.value || !panelRef.value) return;
  const t = ev.target as Node;
  if (panelRef.value.contains(t)) return;
  const el = t instanceof Element ? t : null;
  if (el?.closest('[data-kiut-filter-chip]')) return;
  for (const tr of triggerRefs.values()) {
    if (tr?.contains(t)) return;
  }
  applyDraft();
}

function onWinKeydown(ev: KeyboardEvent) {
  if (ev.key === 'Escape' && panelOpen.value) {
    ev.preventDefault();
    closePanel();
  }
}

function onWinResize() {
  if (!panelOpen.value || !panelAnchorEl.value) return;
  positionPanel(panelAnchorEl.value);
}

onMounted(() => {
  document.addEventListener('mousedown', onDocPointerDown, true);
  window.addEventListener('keydown', onWinKeydown, true);
  window.addEventListener('resize', onWinResize);
});

onBeforeUnmount(() => {
  document.removeEventListener('mousedown', onDocPointerDown, true);
  window.removeEventListener('keydown', onWinKeydown, true);
  window.removeEventListener('resize', onWinResize);
});

watch(
  () => props.modelValue,
  () => {
    const def = openDefinition.value;
    if (def && panelOpen.value && !slots.panel) syncDraftFromValue(def);
  },
  { deep: true }
);
</script>
