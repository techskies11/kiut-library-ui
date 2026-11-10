<template>
  <button
    type="button"
    :class="[
      notificationUnread,
      'flex w-full gap-3 border-b px-4 py-3 text-left transition-colors border-slate-100 hover:bg-slate-50 dark:border-[#2c2c34] dark:bg-[#1c1c21] dark:hover:bg-[#2f2f379c]',
    ]"
    @click="emit('select', item)"
  >
    <span
      class="mt-1.5 h-2 w-2 shrink-0 rounded-full"
      :class="dotClass"
      aria-hidden="true"
    />
    <div :class="[notificationType, 'flex flex-1']">
      <div>
        <span
          class="flex items-center gap-1.5 text-sm font-semibold text-slate-900 dark:text-slate-100"
        >
          <component
            :is="icon"
            class="h-4 w-4 shrink-0 text-slate-500 dark:text-slate-400"
            aria-hidden="true"
          />
          <span class="truncate">{{ item.title }}</span>
        </span>
        <p
          class="mt-0.5 text-sm leading-snug text-slate-500 dark:text-slate-400"
        >
          {{ item.body }}
        </p>
      </div>
      <div>
        <p class="mt-1 text-xs text-slate-400 dark:text-slate-500">
          {{ item.time }}
        </p>
      </div>
    </div>
  </button>
</template>

<script setup lang="ts">
import { computed } from "vue";
import {
  ClockIcon,
  EnvelopeIcon,
  ShieldExclamationIcon,
} from "@heroicons/vue/24/outline";
import type {
  InboxNotification,
  NotificationTone,
} from "./notificationCardTypes";

const props = defineProps<{
  item: InboxNotification;
}>();

const emit = defineEmits<{
  select: [item: InboxNotification];
}>();

const iconByTone: Record<NotificationTone, typeof EnvelopeIcon> = {
  message: EnvelopeIcon,
  pending: ClockIcon,
  alert: ShieldExclamationIcon,
};

const dotByTone: Record<NotificationTone, string> = {
  message: "bg-violet-500",
  pending: "bg-amber-400",
  alert: "bg-red-500",
};

const icon = computed(() => iconByTone[props.item.tone]);
const dotClass = computed(() => dotByTone[props.item.tone]);

const notificationType = computed(() =>
  props.item.type === "notification" ? "flex-col" : "flex-row justify-between",
);

const notificationUnread = computed(() =>
  props.item.unread === true ? "opacity-100" : "opacity-50",
 );
</script>
