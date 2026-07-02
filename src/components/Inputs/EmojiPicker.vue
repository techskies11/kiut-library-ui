<template>
  <div ref="rootRef" class="relative inline-flex shrink-0 font-sans">
    <button
      ref="buttonRef"
      :id="buttonId"
      type="button"
      :disabled="disabled"
      :class="[
        kiutInputControlClass,
        'inline-flex min-h-[2.75rem] w-auto items-center justify-center gap-2 px-3 py-2',
        triggerLabel ? 'min-w-[9rem]' : 'min-w-[2.75rem]',
        open ? 'border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25' : '',
      ]"
      :aria-expanded="open"
      aria-haspopup="dialog"
      :aria-controls="panelId"
      :aria-label="resolvedTriggerAriaLabel"
      @click="onTriggerClick"
      @keydown="onTriggerKeydown"
    >
      <span
        class="inline-flex shrink-0 text-[color:var(--kiut-text-muted)] dark:text-slate-400"
        aria-hidden="true"
      >
        <slot name="icon">
          <FaceSmileIcon class="h-5 w-5" />
        </slot>
      </span>
      <span v-if="triggerLabel" class="truncate text-sm">{{ triggerLabel }}</span>
      <ChevronDownIcon
        v-if="triggerLabel"
        class="h-5 w-5 shrink-0 text-gray-400 transition-transform dark:text-slate-500"
        :class="open ? 'rotate-180' : ''"
        aria-hidden="true"
      />
    </button>

    <Teleport to="body">
      <div
        v-show="open"
        ref="panelRef"
        :id="panelId"
        role="dialog"
        :aria-label="ariaLabel"
        :style="floatingStyle"
        class="fixed z-[300] flex w-[20rem] flex-col overflow-hidden rounded-xl border border-gray-300/80 bg-white shadow-lg dark:border-[color:var(--kiut-border-light)] dark:bg-[#141416]"
        @click.stop
        @keydown.stop="onPanelKeydown"
      >
        <div class="border-b border-gray-200/80 p-3 dark:border-white/10">
          <input
            ref="searchInputRef"
            v-model="searchQuery"
            type="search"
            :disabled="disabled"
            :placeholder="searchPlaceholder"
            :aria-label="searchPlaceholder"
            autocomplete="off"
            spellcheck="false"
            class="min-h-[2.5rem] w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-[color:var(--kiut-text-primary)] shadow-sm outline-none transition placeholder:text-[color:var(--kiut-text-muted)] focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 disabled:cursor-not-allowed dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)] dark:text-slate-100 dark:placeholder:text-slate-500"
            @click.stop
          />
        </div>

        <div class="min-h-0 flex-1 space-y-4 overflow-y-auto p-3">
          <template v-if="visibleCategories.length > 0">
            <section
              v-for="category in visibleCategories"
              :key="category.id"
            >
              <h3
                class="mb-2 text-[11px] font-bold uppercase tracking-wide text-[color:var(--kiut-text-muted)] dark:text-slate-500"
              >
                {{ category.label }}
              </h3>
              <div class="grid grid-cols-8 gap-0.5">
                <button
                  v-for="emoji in category.emojis"
                  :key="`${category.id}-${emoji}`"
                  type="button"
                  :disabled="disabled"
                  :aria-label="`Add ${emoji} to input`"
                  :class="emojiButtonClass(emoji)"
                  @click.stop="selectEmoji(emoji)"
                >
                  <span class="text-[1.35rem] leading-none">{{ emoji }}</span>
                </button>
              </div>
            </section>
          </template>

          <p
            v-else
            class="py-8 text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-500"
          >
            {{ emptySearchText }}
          </p>
        </div>

        <p
          v-if="hint"
          class="border-t border-gray-200/80 px-3 py-2.5 text-[11px] leading-relaxed text-[color:var(--kiut-text-muted)] dark:border-white/10 dark:text-slate-500"
        >
          {{ hint }}
        </p>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ChevronDownIcon, FaceSmileIcon } from '@heroicons/vue/24/outline';
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue';
import { randomInstanceSuffix } from '../../utils/randomId';
import {
  DEFAULT_EMOJI_CATALOG,
  DEFAULT_CATEGORY_LABELS,
  appendEmojiToDraft,
  extractEmojis,
  filterEmojiCatalog,
  type EmojiCategoryId,
  type EmojiPickerCategory,
} from './emojiCatalog';
import { kiutInputControlClass } from './inputFieldStyles';

defineOptions({ name: 'EmojiPicker' });

const props = withDefaults(
  defineProps<{
    /** Bound to the target input; each emoji click appends to this string */
    draft?: string;
    categories?: EmojiPickerCategory[];
    categoryLabels?: Partial<Record<EmojiCategoryId, string>>;
    triggerLabel?: string;
    searchPlaceholder?: string;
    emptySearchText?: string;
    hint?: string;
    disabled?: boolean;
    ariaLabel?: string;
    ariaLabelTrigger?: string;
  }>(),
  {
    draft: '',
    searchPlaceholder: 'Search emoji…',
    emptySearchText: 'No emojis match your search.',
    ariaLabel: 'Emoji picker',
  }
);

const emit = defineEmits<{
  'update:draft': [value: string];
  select: [emoji: string];
  open: [];
  close: [];
}>();

const uid = `kiut-emoji-picker-${randomInstanceSuffix()}`;
const buttonId = `${uid}-btn`;
const panelId = `${uid}-panel`;

const rootRef = ref<HTMLElement | null>(null);
const buttonRef = ref<HTMLElement | null>(null);
const panelRef = ref<HTMLElement | null>(null);
const searchInputRef = ref<HTMLInputElement | null>(null);
const open = ref(false);
const searchQuery = ref('');
const floatingStyle = ref<Record<string, string>>({});

const resolvedTriggerAriaLabel = computed(
  () => props.ariaLabelTrigger ?? props.triggerLabel ?? props.ariaLabel
);

const resolvedLabels = computed(() => ({
  ...DEFAULT_CATEGORY_LABELS,
  ...props.categoryLabels,
}));

const draftEmojiSet = computed(() => new Set(extractEmojis(props.draft)));

const visibleCategories = computed(() => {
  if (props.categories?.length) {
    const query = searchQuery.value.trim().toLowerCase();
    if (!query) return props.categories;

    return props.categories
      .map((category) => ({
        ...category,
        emojis: category.emojis.filter((emoji) => {
          if (emoji.includes(query)) return true;
          if (category.label.toLowerCase().includes(query)) return true;
          return category.id.toLowerCase().includes(query);
        }),
      }))
      .filter((category) => category.emojis.length > 0);
  }

  return filterEmojiCatalog(
    DEFAULT_EMOJI_CATALOG,
    resolvedLabels.value,
    searchQuery.value
  );
});

function updatePosition(): void {
  const btn = buttonRef.value;
  if (!btn) return;

  const rect = btn.getBoundingClientRect();
  const panelWidth = 320;
  const gap = 8;
  const viewportPadding = 8;
  let left = rect.right - panelWidth;

  if (left < viewportPadding) {
    left = rect.left;
  }
  if (left + panelWidth > window.innerWidth - viewportPadding) {
    left = Math.max(viewportPadding, window.innerWidth - panelWidth - viewportPadding);
  }

  const maxPanelHeight = Math.max(160, rect.top - gap - viewportPadding);

  floatingStyle.value = {
    bottom: `${window.innerHeight - rect.top + gap}px`,
    left: `${left}px`,
    width: `${panelWidth}px`,
    maxHeight: `${maxPanelHeight}px`,
  };
}

function emojiButtonClass(emoji: string): string {
  const base =
    'flex h-9 w-9 items-center justify-center rounded-lg transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-white/5';

  if (draftEmojiSet.value.has(emoji)) {
    return `${base} bg-[color:var(--kiut-primary)]/15 ring-2 ring-[color:var(--kiut-primary)]/70 dark:bg-[color:var(--kiut-primary)]/25`;
  }

  return base;
}

function selectEmoji(emoji: string): void {
  if (props.disabled) return;
  const nextDraft = appendEmojiToDraft(props.draft ?? '', emoji);
  emit('update:draft', nextDraft);
  emit('select', emoji);
}

function openPanel(): void {
  searchQuery.value = '';
  emit('open');
  void nextTick(() => {
    updatePosition();
    searchInputRef.value?.focus();
  });
}

function closePanel(): void {
  if (!open.value) return;
  open.value = false;
  searchQuery.value = '';
  emit('close');
  buttonRef.value?.focus();
}

function togglePanel(): void {
  if (props.disabled) return;
  if (open.value) {
    closePanel();
    return;
  }
  open.value = true;
  openPanel();
}

function onTriggerClick(event: MouseEvent): void {
  event.stopPropagation();
  togglePanel();
}

function onDocumentClick(event: MouseEvent): void {
  if (!open.value) return;
  const target = event.target as Node;
  const root = rootRef.value;
  const panel = panelRef.value;
  if (root && !root.contains(target) && (!panel || !panel.contains(target))) {
    closePanel();
  }
}

function onTriggerKeydown(event: KeyboardEvent): void {
  if (props.disabled) return;
  if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    if (!open.value) {
      open.value = true;
      openPanel();
    }
  }
  if (event.key === 'Escape' && open.value) {
    event.preventDefault();
    closePanel();
  }
}

function onPanelKeydown(event: KeyboardEvent): void {
  if (event.key === 'Escape') {
    event.preventDefault();
    closePanel();
  }
}

function onViewportChange(): void {
  if (open.value) updatePosition();
}

onMounted(() => {
  document.addEventListener('click', onDocumentClick);
  window.addEventListener('resize', onViewportChange);
  window.addEventListener('scroll', onViewportChange, true);
});

onUnmounted(() => {
  document.removeEventListener('click', onDocumentClick);
  window.removeEventListener('resize', onViewportChange);
  window.removeEventListener('scroll', onViewportChange, true);
});
</script>
