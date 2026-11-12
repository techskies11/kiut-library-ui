<template>
  <div
    v-if="items.length"
    class="flex w-full max-w-[22.5rem] flex-col gap-2 font-sans"
    data-testid="float"
  >
    <article
      v-for="item in visibleItems"
      :key="item.id"
      class="relative rounded-2xl border border-slate-200 bg-white px-3.5 py-3 shadow-lg shadow-slate-900/5 dark:border-white/10 dark:bg-[#23232a] dark:shadow-black/40"
      :data-testid="`float-card-${item.id}`"
    >
      <button
        type="button"
        class="absolute right-2.5 top-2.5 inline-flex h-6 w-6 items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-slate-100"
        :aria-label="closeLabel"
        :data-testid="`float-close-${item.id}`"
        @click="emit('dismiss', item)"
      >
        <XMarkIcon class="h-4 w-4" aria-hidden="true" />
      </button>

      <div class="flex gap-3 pr-6">
        <span
          class="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
          :class="toneClass[item.tone]"
          aria-hidden="true"
        >
          <component :is="iconByName[item.icon]" class="h-4 w-4" />
        </span>
        <div class="min-w-0 flex-1">
          <p class="text-sm font-semibold leading-snug text-slate-900 dark:text-white">
            {{ item.title }}
          </p>
          <p class="mt-1 line-clamp-2 text-sm leading-snug text-slate-500 dark:text-slate-400">
            {{ item.subtitle }}
          </p>
        </div>
      </div>

      <div class="mt-2 flex justify-end">
        <button
          type="button"
          class="rounded-lg bg-slate-100 px-3 py-1 text-sm font-medium text-slate-800 transition-colors hover:bg-slate-200 dark:bg-white/10 dark:text-slate-100 dark:hover:bg-white/15"
          :data-testid="`float-action-${item.id}`"
          @click="onAction(item)"
        >
          {{ item.actionLabel || actionLabel }}
        </button>
      </div>
    </article>

    <div
      v-if="hasOverflow"
      class="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 shadow-lg shadow-slate-900/5 dark:border-white/10 dark:bg-[#23232a]"
      data-testid="float-overflow"
    >
      <button
        type="button"
        class="text-sm font-medium text-[color:var(--kiut-primary)]"
        data-testid="float-toggle"
        @click="expanded = !expanded"
      >
        {{ expanded ? showLessLabel : formattedMoreLabel }}
      </button>
      <button
        type="button"
        class="text-sm text-slate-500 transition-colors hover:text-slate-800 dark:text-slate-300 dark:hover:text-white"
        data-testid="float-dismiss-all"
        @click="emit('dismiss-all')"
      >
        {{ dismissAllLabel }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import {
  ChatBubbleLeftIcon,
  CheckIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  XMarkIcon,
} from "@heroicons/vue/24/outline";
import type { FloatIcon, FloatItem, FloatTone } from "./floatTypes";

const props = withDefaults(
  defineProps<{
    items: FloatItem[];
    maxVisible?: number;
    actionLabel?: string;
    closeLabel?: string;
    moreLabel?: string;
    showLessLabel?: string;
    dismissAllLabel?: string;
  }>(),
  {
    maxVisible: 3,
    actionLabel: "Ver",
    closeLabel: "Cerrar",
    moreLabel: "+{count} alertas más",
    showLessLabel: "Ver menos",
    dismissAllLabel: "Descartar todas",
  },
);

const emit = defineEmits<{
  navigate: [item: FloatItem];
  dismiss: [item: FloatItem];
  "dismiss-all": [];
}>();

function onAction(item: FloatItem): void {
  emit("navigate", item);
  emit("dismiss", item);
}

const expanded = ref(false);

const overflowCount = computed(() =>
  Math.max(0, props.items.length - props.maxVisible),
);

const hasOverflow = computed(() => overflowCount.value > 0 || expanded.value);

const visibleItems = computed(() =>
  expanded.value ? props.items : props.items.slice(0, props.maxVisible),
);

const formattedMoreLabel = computed(() =>
  props.moreLabel.replace("{count}", String(overflowCount.value)),
);

watch(
  () => props.items.length,
  (length) => {
    if (length <= props.maxVisible) expanded.value = false;
  },
);

const toneClass: Record<FloatTone, string> = {
  danger: "bg-red-500/15 text-red-500 dark:bg-red-500/20 dark:text-red-400",
  warning:
    "bg-amber-500/15 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400",
  success:
    "bg-emerald-500/15 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400",
  info: "bg-violet-500/15 text-violet-600 dark:bg-violet-500/20 dark:text-violet-300",
};

const iconByName: Record<FloatIcon, typeof XMarkIcon> = {
  warning: ExclamationTriangleIcon,
  error: XMarkIcon,
  chat: ChatBubbleLeftIcon,
  check: CheckIcon,
  clock: ClockIcon,
};
</script>
