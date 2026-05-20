<template>
  <div
    class="kiut-filters ku:font-[Inter] ku:text-xs"
    role="region"
    :aria-label="regionAriaLabel"
  >
    <!-- Fila 1: etiqueta + pastillas de todos los filtros -->
    <div class="ku:flex ku:flex-wrap ku:items-center ku:gap-x-2 ku:gap-y-1.5">
      <span
        class="ku:shrink-0 ku:font-medium ku:text-[color:var(--kiut-text-secondary)] ku:dark:text-slate-400"
      >
        {{ label }}
      </span>

      <div class="ku:flex ku:min-w-0 ku:flex-1 ku:flex-wrap ku:items-center ku:gap-1.5">
        <button
          v-for="def in filterDefinitions"
          :key="`pill-${def.id}`"
          :ref="(el) => setTriggerRef(def.id, el)"
          type="button"
          class="ku:inline-flex ku:h-[26px] ku:max-w-full ku:shrink-0 ku:items-center ku:gap-0.5 ku:rounded-full ku:px-2 ku:font-medium ku:transition-colors"
          :class="filterPillClass(def)"
          :aria-label="filterPillAriaLabel(def)"
          :aria-expanded="openFilterId === def.id"
          :aria-haspopup="true"
          :aria-controls="openFilterId === def.id ? panelId : undefined"
          @click="toggleAddPanel(def, $event)"
        >
          <PlusIcon class="ku:h-2.5 ku:w-2.5 ku:shrink-0" aria-hidden="true" />
          <span class="ku:truncate">{{ def.label }}</span>
          <span
            v-if="def.type === 'select' && selectCount(def) > 0"
            class="ku:ml-0.5 ku:inline-flex ku:min-h-[1.125rem] ku:min-w-[1.125rem] ku:shrink-0 ku:items-center ku:justify-center ku:rounded-full ku:bg-[color:var(--kiut-primary)]/20 ku:px-1 ku:text-[10px] ku:font-semibold ku:tabular-nums ku:text-[color:var(--kiut-primary-default)] ku:dark:bg-[color:var(--kiut-primary)]/25 ku:dark:text-[color:var(--kiut-primary-light)]"
          >
            {{ selectCount(def) }}
          </span>
        </button>
      </div>
    </div>

    <!-- Fila 2: chips de valores + limpiar -->
    <div
      v-if="hasActiveFilters"
      class="ku:mt-2 ku:flex ku:flex-wrap ku:items-center ku:gap-x-3 ku:gap-y-1.5"
    >
      <div class="ku:flex ku:min-w-0 ku:flex-wrap ku:items-center ku:gap-1.5">
        <div
          v-for="item in chipItems"
          :key="item.key"
          data-kiut-filter-chip
          class="ku:inline-flex ku:h-[26px] ku:max-w-full ku:items-center ku:gap-1 ku:rounded-full ku:border ku:border-[color:var(--kiut-border-light)] ku:bg-slate-100/90 ku:pl-2 ku:pr-1 ku:text-[color:var(--kiut-text-primary)] ku:dark:bg-white/[0.08] ku:dark:text-slate-100"
        >
          <button
            type="button"
            class="ku:min-w-0 ku:flex-1 ku:truncate ku:text-left ku:transition ku:hover:opacity-90"
            :aria-label="chipAriaEdit(item)"
            @click="openChipPanel(item.def, $event)"
          >
            <slot
              name="formatChip"
              :filter="item.def"
              :value="valueFor(item.def.id)"
              :option-value="item.kind === 'select' ? item.optionValue : undefined"
            >
              {{ formatChipDisplay(item) }}
            </slot>
          </button>
          <button
            type="button"
            class="ku:shrink-0 ku:rounded ku:p-0.5 ku:text-[color:var(--kiut-text-muted)] ku:transition ku:hover:bg-black/5 ku:hover:text-[color:var(--kiut-text-primary)] ku:dark:hover:bg-white/10 ku:dark:hover:text-slate-100"
            :aria-label="removeChipAriaLabel(item)"
            @click="removeChipItem(item)"
          >
            <XMarkIcon class="ku:h-3.5 ku:w-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>

      <button
        type="button"
        class="ku:shrink-0 ku:text-[color:var(--kiut-text-secondary)] ku:underline-offset-2 ku:transition ku:hover:text-[color:var(--kiut-primary)] ku:hover:underline ku:dark:text-slate-400 ku:dark:hover:text-[color:var(--kiut-primary-light)]"
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
        class="ku:fixed ku:z-[100] ku:rounded-lg ku:border ku:border-[color:var(--kiut-border-light)] ku:bg-[color:var(--kiut-bg-secondary)] ku:p-3 ku:shadow-lg ku:dark:bg-[#252528]"
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
            <div class="ku:space-y-2">
              <template v-if="openDefinition.type === 'text'">
                <label
                  :for="`${panelId}-text`"
                  class="ku:block ku:text-xs ku:font-medium ku:leading-tight ku:text-[color:var(--kiut-text-secondary)] ku:dark:text-slate-400"
                >
                  {{ openDefinition.label }}
                </label>
                <input
                  :id="`${panelId}-text`"
                  v-model="draftText"
                  type="text"
                  class="ku:w-full ku:rounded-md ku:border ku:border-[color:var(--kiut-border-table)] ku:bg-white ku:px-2 ku:py-1.5 ku:text-xs ku:text-[color:var(--kiut-text-primary)] ku:outline-none ku:ring-[color:var(--kiut-primary)]/25 ku:placeholder:text-[color:var(--kiut-text-muted)] ku:focus:border-[color:var(--kiut-primary)] ku:focus:ring-2 ku:dark:bg-[#1e1e20] ku:dark:text-slate-100 ku:dark:placeholder:text-slate-500"
                  :placeholder="openDefinition.placeholder ?? '…'"
                  @keydown.enter.prevent="applyDraft"
                />
              </template>

              <template v-else-if="openDefinition.type === 'select'">
                <p
                  class="ku:text-xs ku:font-medium ku:leading-tight ku:text-[color:var(--kiut-text-secondary)] ku:dark:text-slate-400"
                >
                  {{ openDefinition.label }}
                </p>
                <ul
                  class="ku:max-h-[min(280px,50vh)] ku:space-y-0.5 ku:overflow-y-auto"
                  role="listbox"
                  :aria-label="openDefinition.label"
                  :aria-multiselectable="true"
                >
                  <li
                    v-for="opt in openDefinition.options"
                    :key="opt.value"
                  >
                    <label
                      class="ku:flex ku:cursor-pointer ku:items-center ku:gap-2.5 ku:rounded-md ku:px-2 ku:py-1.5 ku:text-xs ku:text-[color:var(--kiut-text-primary)] ku:transition ku:hover:bg-black/[0.04] ku:dark:text-slate-100 ku:dark:hover:bg-white/[0.06]"
                    >
                      <input
                        type="checkbox"
                        class="kiut-filter-ms-checkbox ku:shrink-0"
                        :checked="draftSelectValues.includes(opt.value)"
                        @change="toggleDraftSelect(opt.value)"
                      />
                      <span class="ku:min-w-0 ku:flex-1">{{ opt.label }}</span>
                    </label>
                  </li>
                </ul>
              </template>

              <template v-else-if="openDefinition.type === 'dateRange'">
                <p class="ku:text-xs ku:font-medium ku:leading-tight ku:text-[color:var(--kiut-text-secondary)] ku:dark:text-slate-400">
                  {{ openDefinition.label }}
                </p>
                <div class="ku:flex ku:flex-wrap ku:items-end ku:gap-2">
                  <div class="ku:min-w-[120px] ku:flex-1">
                    <label
                      :for="`${panelId}-start`"
                      class="ku:mb-0.5 ku:block ku:text-xs ku:leading-tight ku:text-[color:var(--kiut-text-muted)]"
                    >
                      Desde
                    </label>
                    <input
                      :id="`${panelId}-start`"
                      v-model="draftRangeStart"
                      type="date"
                      class="ku:w-full ku:rounded-md ku:border ku:border-[color:var(--kiut-border-table)] ku:bg-white ku:px-1.5 ku:py-1.5 ku:text-xs ku:text-[color:var(--kiut-text-primary)] ku:outline-none ku:focus:border-[color:var(--kiut-primary)] ku:focus:ring-2 ku:focus:ring-[color:var(--kiut-primary)]/25 ku:dark:bg-[#1e1e20] ku:dark:text-slate-100"
                    />
                  </div>
                  <div class="ku:min-w-[120px] ku:flex-1">
                    <label
                      :for="`${panelId}-end`"
                      class="ku:mb-0.5 ku:block ku:text-xs ku:leading-tight ku:text-[color:var(--kiut-text-muted)]"
                    >
                      Hasta
                    </label>
                    <input
                      :id="`${panelId}-end`"
                      v-model="draftRangeEnd"
                      type="date"
                      class="ku:w-full ku:rounded-md ku:border ku:border-[color:var(--kiut-border-table)] ku:bg-white ku:px-1.5 ku:py-1.5 ku:text-xs ku:text-[color:var(--kiut-text-primary)] ku:outline-none ku:focus:border-[color:var(--kiut-primary)] ku:focus:ring-2 ku:focus:ring-[color:var(--kiut-primary)]/25 ku:dark:bg-[#1e1e20] ku:dark:text-slate-100"
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

type ChipItem =
  | { kind: 'text'; def: FilterDefinitionText; key: string }
  | { kind: 'dateRange'; def: FilterDefinitionDateRange; key: string }
  | {
      kind: 'select';
      def: FilterDefinitionSelect;
      optionValue: string;
      key: string;
    };

const props = withDefaults(
  defineProps<{
    filterDefinitions: FilterDefinition[];
    modelValue: FiltersModelValue;
    label?: string;
    clearLabel?: string;
    regionAriaLabel?: string;
  }>(),
  {
    label: 'ku:Filtros:',
    clearLabel: 'Limpiar filtros',
    regionAriaLabel: 'Filtros',
  }
);

const emit = defineEmits<{
  'ku:update:modelValue': [value: FiltersModelValue];
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
const draftSelectValues = ref<string[]>([]);
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
  if (def.type === 'select') return draftSelectValues.value;
  return { start: draftRangeStart.value, end: draftRangeEnd.value };
});

function setTriggerRef(id: string, el: unknown) {
  if (el && el instanceof HTMLElement) triggerRefs.set(id, el);
  else triggerRefs.delete(id);
}

function valueFor(id: string): unknown {
  return props.modelValue[id];
}

/** Valor de `select`: `string[]` (multi). Acepta `string` heredado como un solo ítem. */
function normalizeSelectValue(v: unknown): string[] {
  if (v === undefined || v === null) return [];
  if (Array.isArray(v)) {
    return v.filter((x): x is string => typeof x === 'string' && x.trim() !== '');
  }
  if (typeof v === 'string') {
    const t = v.trim();
    return t ? [t] : [];
  }
  return [];
}

function isEmptyForDefinition(def: FilterDefinition, v: unknown): boolean {
  if (v === undefined || v === null) return true;
  if (def.type === 'text') return String(v).trim() === '';
  if (def.type === 'select') return normalizeSelectValue(v).length === 0;
  if (def.type === 'dateRange') {
    const o = v as { start?: string; end?: string };
    return !o?.start?.trim() || !o?.end?.trim();
  }
  return true;
}

const hasActiveFilters = computed(() =>
  props.filterDefinitions.some((d) => !isEmptyForDefinition(d, valueFor(d.id)))
);

const chipItems = computed((): ChipItem[] => {
  const items: ChipItem[] = [];
  for (const def of props.filterDefinitions) {
    const v = valueFor(def.id);
    if (isEmptyForDefinition(def, v)) continue;
    if (def.type === 'text') {
      items.push({ kind: 'text', def, key: def.id });
    } else if (def.type === 'dateRange') {
      items.push({ kind: 'dateRange', def, key: def.id });
    } else if (def.type === 'select') {
      for (const optVal of normalizeSelectValue(v)) {
        items.push({
          kind: 'select',
          def,
          optionValue: optVal,
          key: `${def.id}::${optVal}`,
        });
      }
    }
  }
  return items;
});

function selectCount(def: FilterDefinition): number {
  if (def.type !== 'select') return 0;
  return normalizeSelectValue(valueFor(def.id)).length;
}

function formatChipText(def: FilterDefinition): string {
  const v = valueFor(def.id);
  const base = def.label.replace(/^\+\s*/, '');
  if (def.type === 'text') return `${base}: ${String(v ?? '').trim()}`;
  if (def.type === 'select') {
    const arr = normalizeSelectValue(v);
    const labels = arr.map((val) => {
      const opt = def.options.find((o) => o.value === val);
      return opt?.label ?? val;
    });
    return `${base}: ${labels.join(', ')}`;
  }
  const r = v as { start: string; end: string };
  const a = formatDateShort(r.start);
  const b = formatDateShort(r.end);
  return `${base}: ${a} – ${b}`;
}

function formatChipDisplay(item: ChipItem): string {
  if (item.kind === 'text' || item.kind === 'dateRange') return formatChipText(item.def);
  const opt = item.def.options.find((o) => o.value === item.optionValue);
  return opt?.label ?? item.optionValue;
}

function formatDateShort(iso: string): string {
  if (!iso) return '';
  const m = moment(iso, 'YYYY-MM-DD', true);
  return m.isValid() ? m.format('L') : iso;
}

function filterPillClass(def: FilterDefinition): string {
  const open = openFilterId.value === def.id && panelOpen.value;
  const has = !isEmptyForDefinition(def, valueFor(def.id));
  if (open || has) {
    return 'ku:border ku:border-solid ku:border-[color:var(--kiut-primary)] ku:bg-[color:var(--kiut-primary)]/10 ku:text-[color:var(--kiut-primary-default)] ku:dark:border-[color:var(--kiut-primary-light)] ku:dark:bg-[color:var(--kiut-primary)]/15 ku:dark:text-[color:var(--kiut-primary-light)]';
  }
  return 'ku:border ku:border-dashed ku:border-[#838395] ku:text-[color:var(--kiut-text-secondary)] ku:hover:border-[#838395] ku:hover:bg-slate-50 ku:dark:border-[#838395] ku:dark:text-slate-400 ku:dark:hover:border-[#838395] ku:dark:hover:bg-white/[0.04]';
}

function filterPillAriaLabel(def: FilterDefinition): string {
  return isEmptyForDefinition(def, valueFor(def.id))
    ? addFilterAriaLabel(def)
    : `Editar filtro ${def.label.replace(/^\+\s*/, '')}`;
}

function syncDraftFromValue(def: FilterDefinition) {
  const v = valueFor(def.id);
  if (def.type === 'text') {
    draftText.value = v !== undefined && v !== null ? String(v) : '';
    return;
  }
  if (def.type === 'select') {
    draftSelectValues.value = [...normalizeSelectValue(v)];
    return;
  }
  const r = v as { start?: string; end?: string } | undefined;
  draftRangeStart.value = r?.start?.trim() ?? '';
  draftRangeEnd.value = r?.end?.trim() ?? '';
}

function emitSelectFromDraft() {
  const def = openDefinition.value;
  if (!def || def.type !== 'select') return;
  const next = { ...props.modelValue };
  if (draftSelectValues.value.length === 0) delete next[def.id];
  else next[def.id] = [...draftSelectValues.value];
  emit('ku:update:modelValue', next);
  emit('change', next);
}

function toggleDraftSelect(value: string) {
  const i = draftSelectValues.value.indexOf(value);
  if (i >= 0) {
    draftSelectValues.value = draftSelectValues.value.filter((_, j) => j !== i);
  } else {
    draftSelectValues.value = [...draftSelectValues.value, value];
  }
  emitSelectFromDraft();
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
    'input[type="text"], input[type="date"], input[type="checkbox"], select, button, ku:[href], textarea, ku:[tabindex]:not([tabindex="-1"])'
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
    draftSelectValues.value = Array.isArray(v)
      ? v.filter((x): x is string => typeof x === 'string')
      : normalizeSelectValue(v);
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
    emit('ku:update:modelValue', next);
    emit('change', next);
    closePanel();
    return;
  }

  if (def.type === 'select') {
    emitSelectFromDraft();
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
  emit('ku:update:modelValue', next);
  emit('change', next);
  closePanel();
}

function removeFilter(id: string) {
  const next = { ...props.modelValue };
  delete next[id];
  emit('ku:update:modelValue', next);
  emit('change', next);
  if (openFilterId.value === id) closePanel();
}

function removeChipItem(item: ChipItem) {
  if (item.kind === 'text' || item.kind === 'dateRange') {
    removeFilter(item.def.id);
    return;
  }
  const next = { ...props.modelValue };
  const cur = normalizeSelectValue(next[item.def.id]);
  const filtered = cur.filter((v) => v !== item.optionValue);
  if (filtered.length === 0) delete next[item.def.id];
  else next[item.def.id] = filtered;
  emit('ku:update:modelValue', next);
  emit('change', next);
  if (openFilterId.value === item.def.id) syncDraftFromValue(item.def);
}

function clearAll() {
  const next: FiltersModelValue = {};
  emit('ku:update:modelValue', next);
  emit('change', next);
  closePanel();
}

const panelAriaLabel = computed(() => {
  const d = openDefinition.value;
  return d ? `Editar filtro: ${d.label}` : 'Filtro';
});

function removeChipAriaLabel(item: ChipItem): string {
  const base = item.def.label.replace(/^\+\s*/, '');
  if (item.kind === 'select') {
    const opt = item.def.options.find((o) => o.value === item.optionValue);
    const name = opt?.label ?? item.optionValue;
    return `Quitar ${name} del filtro ${base}`;
  }
  return `Quitar filtro ${base}`;
}

function chipAriaEdit(item: ChipItem): string {
  const base = item.def.label.replace(/^\+\s*/, '');
  if (item.kind === 'select') {
    const opt = item.def.options.find((o) => o.value === item.optionValue);
    const name = opt?.label ?? item.optionValue;
    return `Editar filtro ${base}: ${name}`;
  }
  return `Editar filtro ${base}`;
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
  if (el?.closest('ku:[data-kiut-filter-chip]')) return;
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

<style scoped>
/* Multi-select: checkbox circular acorde a Kiut */
.kiut-filter-ms-checkbox {
  appearance: none;
  -webkit-appearance: none;
  width: 1.125rem;
  height: 1.125rem;
  margin: 0;
  flex-shrink: 0;
  cursor: pointer;
  border-radius: 9999px;
  border: 2px solid var(--kiut-primary);
  background-color: transparent;
  transition:
    background-color 0.15s ease,
    border-color 0.15s ease,
    box-shadow 0.15s ease;
}

.kiut-filter-ms-checkbox:checked {
  background-color: var(--kiut-primary);
  border-color: var(--kiut-primary);
  background-image: url("data:image/svg+xml,%3Csvg xmlns='ku:http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M5 13l4 4L19 7'/%3E%3C/svg%3E");
  background-size: 0.65rem;
  background-position: center;
  background-repeat: no-repeat;
}

.kiut-filter-ms-checkbox:focus-visible {
  outline: 2px solid var(--kiut-primary-light);
  outline-offset: 2px;
}

@media (prefers-reduced-motion: reduce) {
  .kiut-filter-ms-checkbox {
    transition: none;
  }
}
</style>
