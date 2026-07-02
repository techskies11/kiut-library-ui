<template>
  <div
    class="flex flex-col overflow-hidden rounded-xl border border-gray-300/80 bg-white font-sans dark:border-[color:var(--kiut-border-light)] dark:bg-[#141416]"
    :class="disabled ? 'pointer-events-none opacity-50' : ''"
    role="group"
    :aria-label="ariaLabel"
  >
    <div class="border-b border-gray-200/80 p-3 dark:border-white/10">
      <input
        v-model="searchQuery"
        type="search"
        :disabled="disabled"
        :placeholder="searchPlaceholder"
        :aria-label="searchPlaceholder"
        autocomplete="off"
        spellcheck="false"
        class="min-h-[2.5rem] w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-[color:var(--kiut-text-primary)] shadow-sm outline-none transition placeholder:text-[color:var(--kiut-text-muted)] focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 disabled:cursor-not-allowed dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)] dark:text-slate-100 dark:placeholder:text-slate-500"
      />
    </div>

    <div class="max-h-[18.5rem] space-y-4 overflow-y-auto p-3">
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
              :aria-label="emojiAriaLabel(emoji)"
              :aria-pressed="isSelected(emoji)"
              :class="emojiButtonClass(emoji)"
              @click="toggleEmoji(emoji)"
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
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import {
  DEFAULT_EMOJI_CATALOG,
  DEFAULT_CATEGORY_LABELS,
  filterEmojiCatalog,
  type EmojiCategoryId,
  type EmojiPickerCategory,
} from './emojiCatalog';

defineOptions({ name: 'EmojiPicker' });

const props = withDefaults(
  defineProps<{
    modelValue: string[];
    /** Full category override; when omitted, uses the built-in brand-safe catalog */
    categories?: EmojiPickerCategory[];
    /** i18n labels for built-in categories */
    categoryLabels?: Partial<Record<EmojiCategoryId, string>>;
    searchPlaceholder?: string;
    emptySearchText?: string;
    hint?: string;
    disabled?: boolean;
    ariaLabel?: string;
  }>(),
  {
    modelValue: () => [],
    searchPlaceholder: 'Search emoji…',
    emptySearchText: 'No emojis match your search.',
    ariaLabel: 'Emoji picker',
  }
);

const emit = defineEmits<{
  'update:modelValue': [value: string[]];
}>();

const searchQuery = ref('');

const resolvedLabels = computed(() => ({
  ...DEFAULT_CATEGORY_LABELS,
  ...props.categoryLabels,
}));

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

const selectedSet = computed(() => new Set(props.modelValue));

function isSelected(emoji: string): boolean {
  return selectedSet.value.has(emoji);
}

function emojiButtonClass(emoji: string): string {
  const base =
    'flex h-9 w-9 items-center justify-center rounded-lg transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 disabled:cursor-not-allowed';

  if (isSelected(emoji)) {
    return `${base} bg-[color:var(--kiut-primary)]/15 ring-2 ring-[color:var(--kiut-primary)]/70 dark:bg-[color:var(--kiut-primary)]/25`;
  }

  return `${base} hover:bg-gray-100 dark:hover:bg-white/5`;
}

function toggleEmoji(emoji: string): void {
  if (props.disabled) return;

  const next = new Set(props.modelValue);
  if (next.has(emoji)) {
    next.delete(emoji);
  } else {
    next.add(emoji);
  }
  emit('update:modelValue', [...next]);
}

function emojiAriaLabel(emoji: string): string {
  return isSelected(emoji) ? `Remove ${emoji}` : `Add ${emoji}`;
}
</script>
