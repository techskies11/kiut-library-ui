<template>
  <div class="tabs text-sm">
    <div
      role="tablist"
      :aria-label="ariaLabel"
      class="flex flex-wrap gap-0.5 rounded-xl border border-[color:var(--kiut-border-light)] bg-slate-100/95 p-1 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.6)] transition-colors dark:border-white/[0.06] dark:bg-[color:var(--kiut-bg-secondary)] dark:shadow-none"
    >
      <button
        v-for="(item, index) in items"
        :id="tabId(item.value)"
        :key="item.value"
        ref="tabRefs"
        type="button"
        role="tab"
        :aria-selected="isActive(item)"
        :aria-disabled="item.disabled === true"
        :tabindex="isActive(item) ? 0 : -1"
        :class="tabButtonClass(item)"
        @click="onTabClick(item, $event)"
        @keydown="onKeydown($event, index)"
      >
        <span class="flex min-h-9 min-w-0 flex-1 items-center justify-center gap-2 px-3 py-1.5">
          <component
            :is="item.icon"
            v-if="item.icon"
            class="h-[1.125rem] w-[1.125rem] shrink-0"
            aria-hidden="true"
          />
          <span class="truncate whitespace-nowrap font-medium tracking-tight">{{ item.label }}</span>
        </span>
      </button>
    </div>
    <Transition v-if="$slots.default" name="tabs-panel" mode="out-in">
      <div :key="modelValue" class="tabs-panel mt-4">
        <slot :active="modelValue" />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, ref, type Component } from 'vue';

defineOptions({ name: 'Tabs' });

export interface TabItem {
  value: string;
  label: string;
  icon?: Component;
  disabled?: boolean;
}

const props = withDefaults(
  defineProps<{
    items: TabItem[];
    modelValue: string;
    ariaLabel?: string;
  }>(),
  {
    ariaLabel: 'Tabs',
  }
);

const emit = defineEmits<{
  'update:modelValue': [value: string];
  change: [payload: { value: string; previousValue: string }];
  'tab-click': [payload: { value: string; originalEvent: MouseEvent }];
}>();

const tabRefs = ref<HTMLButtonElement[]>([]);

const uid = `tabs-${Math.random().toString(36).slice(2, 9)}`;
const tabId = (value: string) => `${uid}-tab-${value}`;

const enabledIndices = computed(() =>
  props.items.map((item, i) => (item.disabled ? -1 : i)).filter((i) => i >= 0)
);

function isActive(item: TabItem): boolean {
  return item.value === props.modelValue;
}

function tabButtonClass(item: TabItem): string {
  const active = isActive(item);
  const base =
    'relative flex min-w-0 flex-1 cursor-pointer rounded-lg border border-transparent text-center outline-none transition-[background-color,color,box-shadow,opacity,transform] duration-300 ease-[cubic-bezier(0.33,1,0.68,1)] motion-reduce:transition-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary-light)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--kiut-bg-primary)] dark:focus-visible:ring-offset-[color:var(--kiut-bg-primary)] active:scale-[0.99] motion-reduce:active:scale-100';
  if (item.disabled) {
    return `${base} cursor-not-allowed opacity-40`;
  }
  if (active) {
    return `${base} bg-white text-[color:var(--kiut-text-primary)] shadow-sm ring-1 ring-black/[0.04] dark:bg-black/45 dark:text-[color:var(--kiut-text-primary)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.35)] dark:ring-white/[0.06]`;
  }
  return `${base} text-[color:var(--kiut-text-secondary)] hover:text-[color:var(--kiut-text-primary)] dark:text-[color:var(--kiut-text-muted)] dark:hover:text-[color:var(--kiut-text-secondary)]`;
}

function select(value: string, previousValue: string) {
  if (value === previousValue) return;
  const target = props.items.find((t) => t.value === value);
  if (target?.disabled) return;
  emit('update:modelValue', value);
  emit('change', { value, previousValue });
}

function onTabClick(item: TabItem, e: MouseEvent) {
  emit('tab-click', { value: item.value, originalEvent: e });
  if (item.disabled) return;
  select(item.value, props.modelValue);
  void nextTick(() => {
    const el = tabRefs.value[props.items.indexOf(item)];
    el?.focus();
  });
}

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

async function onKeydown(e: KeyboardEvent, index: number) {
  const keys = ['ArrowLeft', 'ArrowRight', 'Home', 'End'];
  if (!keys.includes(e.key)) return;
  e.preventDefault();

  let next = index;
  if (e.key === 'ArrowLeft') next = findNextEnabled(index, -1);
  else if (e.key === 'ArrowRight') next = findNextEnabled(index, 1);
  else if (e.key === 'Home') next = enabledIndices.value[0] ?? 0;
  else if (e.key === 'End') next = enabledIndices.value[enabledIndices.value.length - 1] ?? index;

  const item = props.items[next];
  if (!item || item.disabled) return;

  select(item.value, props.modelValue);
  await nextTick();
  tabRefs.value[next]?.focus();
}

</script>

<style scoped>
.tabs {
  font-family: var(--tabs-font, 'Inter', system-ui, sans-serif);
}

/* Panel: fade mínimo al cambiar de pestaña */
.tabs-panel-enter-active,
.tabs-panel-leave-active {
  transition: opacity 0.18s ease-out;
}

.tabs-panel-enter-from,
.tabs-panel-leave-to {
  opacity: 0;
}

.tabs-panel-enter-active {
  transition-delay: 0.02s;
}

@media (prefers-reduced-motion: reduce) {
  .tabs-panel-enter-active,
  .tabs-panel-leave-active {
    transition: none;
  }
}
</style>
