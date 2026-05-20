<template>
  <div class="tabs ku:text-sm">
    <div
      role="tablist"
      :aria-label="ariaLabel"
      :class="[
        'ku:box-border ku:h-10 ku:max-h-10 ku:min-h-10 ku:flex-wrap ku:items-center ku:gap-0.5 ku:rounded-xl ku:border ku:border-[color:var(--kiut-border-light)] ku:bg-slate-100/95 ku:px-0.5 ku:py-1 ku:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.6)] ku:transition-colors ku:dark:bg-[color:var(--kiut-bg-secondary)] ku:dark:shadow-none',
        fullWidth ? 'ku:flex ku:w-full' : 'ku:inline-flex ku:w-fit ku:max-w-full',
      ]"
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
        <span
          class="tabs-tab__label ku:flex ku:min-h-0 ku:min-w-0 ku:items-center ku:justify-center ku:gap-2 ku:px-3"
          :class="{ 'ku:min-w-0 ku:flex-1': fullWidth }"
        >
          <component
            :is="item.icon"
            v-if="item.icon"
            class="ku:h-[1.125rem] ku:w-[1.125rem] ku:shrink-0"
            aria-hidden="true"
          />
          <span class="ku:truncate ku:whitespace-nowrap ku:font-medium ku:tracking-tight">{{ item.label }}</span>
        </span>
      </button>
    </div>
    <Transition v-if="$slots.default" name="tabs-panel" mode="out-in">
      <div :key="modelValue" class="tabs-panel ku:mt-4">
        <slot :active="modelValue" />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, ref, type Component } from 'vue';
import { randomInstanceSuffix } from '../../utils/randomId';

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
    /** Si es true, la barra y cada pestaña reparten el ancho completo del contenedor (comportamiento tipo segmented control). */
    fullWidth?: boolean;
  }>(),
  {
    ariaLabel: 'Tabs',
    fullWidth: false,
  }
);

const emit = defineEmits<{
  'update:modelValue': [value: string];
  change: [payload: { value: string; previousValue: string }];
  'tab-click': [payload: { value: string; originalEvent: MouseEvent }];
}>();

const tabRefs = ref<HTMLButtonElement[]>([]);

const uid = `tabs-${randomInstanceSuffix()}`;
const tabId = (value: string) => `${uid}-tab-${value}`;

const enabledIndices = computed(() =>
  props.items.map((item, i) => (item.disabled ? -1 : i)).filter((i) => i >= 0)
);

function isActive(item: TabItem): boolean {
  return item.value === props.modelValue;
}

function tabButtonClass(item: TabItem): string {
  const active = isActive(item);
  const width =
    props.fullWidth
      ? 'ku:relative ku:flex ku:min-w-0 ku:flex-1'
      : 'ku:relative ku:inline-flex ku:max-w-full ku:shrink-0';
  const base = `${width} ku:h-8 ku:max-h-8 ku:min-h-8 ku:items-stretch ku:cursor-pointer ku:rounded-lg ku:border ku:border-transparent ku:text-center ku:outline-none ku:focus-visible:ring-2 ku:focus-visible:ring-[color:var(--kiut-primary-light)] ku:focus-visible:ring-offset-2 ku:focus-visible:ring-offset-[color:var(--kiut-bg-primary)] ku:dark:focus-visible:ring-offset-[color:var(--kiut-bg-primary)] ku:active:scale-[0.99] ku:motion-reduce:active:scale-100`;
  if (item.disabled) {
    return `${base} ku:cursor-not-allowed ku:opacity-40`;
  }
  if (active) {
    return `${base} ku:bg-white ku:text-[color:var(--kiut-text-primary)] ku:shadow-sm ku:ring-1 ku:ring-black/[0.04] ku:dark:bg-black/45 ku:dark:text-[color:var(--kiut-text-primary)] ku:dark:shadow-[0_1px_3px_rgba(0,0,0,0.35)] ku:dark:ring-white/[0.06]`;
  }
  return `${base} ku:text-[color:var(--kiut-text-secondary)] ku:hover:text-[color:var(--kiut-text-primary)] ku:dark:text-[color:var(--kiut-text-muted)] ku:dark:hover:text-[color:var(--kiut-text-secondary)]`;
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

.tabs-tab__label {
  height: stretch;
}

/* Alturas fijas: track 40px, botones 32px */
.tabs :deep([role='tablist']) {
  height: 40px;
  min-height: 40px;
  max-height: 40px;
}

.tabs :deep([role='tablist'] [role='tab']) {
  box-sizing: border-box;
  height: 32px;
  min-height: 32px;
  max-height: 32px;
  transition:
    background-color 0.3s cubic-bezier(0.33, 1, 0.68, 1),
    color 0.3s cubic-bezier(0.33, 1, 0.68, 1),
    box-shadow 0.3s cubic-bezier(0.33, 1, 0.68, 1),
    opacity 0.3s cubic-bezier(0.33, 1, 0.68, 1),
    transform 0.3s cubic-bezier(0.33, 1, 0.68, 1);
}

.tabs :deep([role='tablist'] [role='tab'][aria-selected='true']) {
  z-index: 1;
}

@media (prefers-reduced-motion: reduce) {
  .tabs :deep([role='tablist'] [role='tab']) {
    transition: none;
  }
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
