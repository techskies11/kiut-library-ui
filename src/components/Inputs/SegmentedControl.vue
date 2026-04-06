<template>
  <div
    role="tablist"
    :aria-label="ariaLabel"
    class="inline-flex w-full max-w-full rounded-lg border border-gray-300 bg-transparent p-0.5 font-sans dark:border-white/[0.12]"
  >
    <button
      v-for="(item, index) in items"
      :id="segmentId(item.value)"
      :key="item.value"
      :ref="(el) => setSegmentRef(el, index)"
      type="button"
      role="tab"
      :aria-selected="isActive(item)"
      :aria-disabled="item.disabled === true"
      :tabindex="isActive(item) ? 0 : -1"
      :class="segmentClass(item)"
      @click="onSelect(item, index, $event)"
      @keydown="onKeydown($event, index)"
    >
      <span class="truncate px-3 py-2 text-sm font-medium">{{ item.label }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, ref } from 'vue';
import { randomInstanceSuffix } from '../../utils/randomId';

defineOptions({ name: 'SegmentedControl' });

export interface SegmentedItem {
  value: string;
  label: string;
  disabled?: boolean;
}

const props = withDefaults(
  defineProps<{
    items: SegmentedItem[];
    modelValue: string;
    ariaLabel?: string;
  }>(),
  {
    ariaLabel: 'Segmented control',
  }
);

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();

const uid = `kiut-seg-${randomInstanceSuffix()}`;
const segmentId = (value: string) => `${uid}-seg-${value}`;
const segmentRefs = ref<(HTMLButtonElement | null)[]>([]);

function setSegmentRef(el: unknown, index: number) {
  if (el instanceof HTMLButtonElement) segmentRefs.value[index] = el;
  else segmentRefs.value[index] = null;
}

function isActive(item: SegmentedItem): boolean {
  return item.value === props.modelValue;
}

function segmentClass(item: SegmentedItem) {
  const active = isActive(item);
  const base =
    'flex min-w-0 flex-1 cursor-pointer items-center justify-center rounded-md outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]';
  if (item.disabled) {
    return `${base} cursor-not-allowed opacity-40`;
  }
  if (active) {
    return `${base} bg-[color:var(--kiut-primary)] text-white shadow-sm`;
  }
  return `${base} text-[color:var(--kiut-text-primary)] hover:bg-black/[0.03] dark:text-slate-100 dark:hover:bg-white/[0.06]`;
}

function select(item: SegmentedItem) {
  if (item.disabled) return;
  if (item.value === props.modelValue) return;
  emit('update:modelValue', item.value);
}

function onSelect(item: SegmentedItem, index: number, _e: MouseEvent) {
  select(item);
  void nextTick(() => segmentRefs.value[index]?.focus());
}

const enabledIndices = computed(() =>
  props.items.map((it, i) => (it.disabled ? -1 : i)).filter((i) => i >= 0)
);

function findNextEnabled(from: number, dir: -1 | 1): number {
  const n = props.items.length;
  if (n === 0) return 0;
  let i = from;
  for (let step = 0; step < n; step++) {
    i = (i + dir + n) % n;
    if (!props.items[i]?.disabled) return i;
  }
  return from;
}

function onKeydown(e: KeyboardEvent, index: number) {
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
    e.preventDefault();
    const next = findNextEnabled(index, 1);
    const item = props.items[next];
    if (item) select(item);
    void nextTick(() => segmentRefs.value[next]?.focus());
  } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
    e.preventDefault();
    const prev = findNextEnabled(index, -1);
    const item = props.items[prev];
    if (item) select(item);
    void nextTick(() => segmentRefs.value[prev]?.focus());
  } else if (e.key === 'Home') {
    e.preventDefault();
    const first = enabledIndices.value[0];
    if (first !== undefined) {
      const item = props.items[first];
      if (item) select(item);
      void nextTick(() => segmentRefs.value[first]?.focus());
    }
  } else if (e.key === 'End') {
    e.preventDefault();
    const last = enabledIndices.value[enabledIndices.value.length - 1];
    if (last !== undefined) {
      const item = props.items[last];
      if (item) select(item);
      void nextTick(() => segmentRefs.value[last]?.focus());
    }
  }
}
</script>
