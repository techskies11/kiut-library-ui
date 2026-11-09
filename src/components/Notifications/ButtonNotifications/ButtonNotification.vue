<template>
  <div ref="rootRef" class="relative inline-flex font-sans">
    <Button
      variant="secondary"
      class="!h-10 !w-10 !min-w-10 !p-0"
      aria-label="Notificaciones"
      :aria-expanded="open"
      @click="open = !open"
    >
      <template #icon>
        <BellIcon class="h-5 w-5" />
      </template>
    </Button>
    <span
      v-if="unreadCount > 0"
      class="pointer-events-none absolute -right-1 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[11px] font-semibold text-white"
    >
      {{ unreadCount }}
    </span>

    <div
      v-if="open"
      class="absolute right-0 top-full z-50 mt-2 w-[22.5rem] overflow-hidden rounded-2xl border border-slate-200 bg-white text-slate-900 shadow-xl shadow-slate-900/10 dark:border-white/10 dark:bg-slate-900 dark:text-slate-100 dark:shadow-black/40"
    >
      <header class="flex items-center justify-between gap-3 px-4 pb-2 pt-4">
        <h2 class="text-base font-semibold tracking-tight">
          {{ titleNotification }}
        </h2>
        <button
          type="button"
          class="text-sm text-slate-500 transition-colors hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100"
          @click="emit('mark-all')"
        >
          {{ markAll }}
        </button>
      </header>

      <div class="flex items-center gap-2 px-3 pb-2">
        <button
          type="button"
          class="rounded-full px-4 py-1.5 text-sm font-medium transition-colors"
          :class="
            filter === 'all'
              ? 'border border-slate-200 text-slate-900 dark:border-white/15 dark:text-slate-100'
              : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100'
          "
          @click="filter = 'all'"
        >
          {{ allText }} ({{ items.length }})
        </button>
        <button
          type="button"
          class="rounded-full px-3 py-1.5 text-sm font-medium transition-colors"
          :class="
            filter === 'unread'
              ? 'border border-slate-200 text-slate-900 dark:border-white/15 dark:text-slate-100'
              : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100'
          "
          @click="filter = 'unread'"
        >
          {{ notRead }} ({{ unreadCount }})
        </button>
      </div>

      <div class="max-h-80 overflow-y-auto">
        <p
          v-if="visibleItems.length === 0"
          class="px-4 py-8 text-center text-sm text-slate-500 dark:text-slate-400"
        >
          {{ emptyText }}
        </p>
        <NotificationCard
          v-for="item in visibleItems"
          :key="item.id"
          :item="item"
          @select="onSelect"
        />
      </div>

      <button
        type="button"
        class="w-full px-4 py-3.5 text-center text-sm font-semibold transition-colors hover:bg-slate-50 dark:hover:bg-white/5"
        @click="emit('view-all')"
      >
        {{ viewAll }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import { BellIcon } from "@heroicons/vue/24/outline";
import Button from "../../Button/Button.vue";
import NotificationCard from "../NotificationCard/NotificationCard.vue";
import type { InboxNotification } from "../NotificationCard/notificationCardTypes.ts";

const props = withDefaults(
  defineProps<{
    items?: InboxNotification[];
    titleNotification?: string;
    markAll?: string;
    allText?: string;
    notRead?: string;
    viewAll?: string;
    emptyText?: string;
  }>(),
  {
    items: () => [
      {
        id: "1",
        tone: "message",
        title: "Nuevo mensaje de María González",
        body: "Hola, necesito cambiar la fecha de mi vuelo para el sábado, ¿es posible?",
        time: "1m ago",
        unread: true,
        type: "notification",
      },
      {
        id: "2",
        tone: "pending",
        title: "Pendiente primera respuesta",
        body: "La conversación de Lucas Pereyra (WhatsApp) superó los 5 min sin primera respuesta.",
        time: "3m ago",
        unread: true,
        type: "notification",
      },
      {
        id: "3",
        tone: "alert",
        title: "Amenaza detectada",
        body: "Mensaje con lenguaje inapropiado detectado en una conversación de Webchat.",
        time: "6m ago",
        unread: true,
        type: "notification",
      },
      {
        id: "4",
        tone: "message",
        title: "Nuevo mensaje de Andrés Rivas",
        body: "Mi maleta no apareció en la cinta, ¿cómo hago el reclamo?",
        time: "8m ago",
        unread: true,
        type: "notification",
      },
    ],
    titleNotification: "Notifications",
    markAll: "Mark all read",
    allText: "Todas",
    notRead: "Solo no leídas",
    viewAll: "View all",
    emptyText: "No hay notificaciones",
  },
);

const emit = defineEmits<{
  "mark-all": [];
  "view-all": [];
  select: [item: InboxNotification];
}>();

const open = ref(false);
const filter = ref<"all" | "unread">("all");
const rootRef = ref<HTMLElement | null>(null);

const unreadCount = computed(
  () => props.items.filter((item) => item.unread).length,
);

const visibleItems = computed(() =>
  filter.value === "unread"
    ? props.items.filter((item) => item.unread)
    : props.items,
);

function onSelect(item: InboxNotification) {
  emit("select", item);
}

function onPointerDown(event: PointerEvent) {
  const root = rootRef.value;
  if (!root || !open.value) return;
  if (event.target instanceof Node && root.contains(event.target)) return;
  open.value = false;
}

onMounted(() => document.addEventListener("pointerdown", onPointerDown));
onUnmounted(() => document.removeEventListener("pointerdown", onPointerDown));
</script>
