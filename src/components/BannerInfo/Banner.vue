<template>
  <div
    role="region"
    :aria-label="title"
    :class="[
      styles.container,
      attrs.class,
      'p-4 flex flex-row gap-2 justify-start items-start border rounded-xl',
    ]"
  >
    <div
      :class="[
        styles.container_icon,
        'p-2 rounded-4xl flex justify-center items-center',
      ]"
      v-if="$slots.icon"
    >
      <span
        :class="[
          styles.icon,
          'inline-flex shrink-0 [&>svg]:h-[1.125rem] [&>svg]:w-[1.125rem]',
        ]"
        aria-hidden="true"
      >
        <slot name="icon" />
      </span>
    </div>
    <div class="flex flex-col gap-1">
      <h2 :class="[styles.title, 'text-base font-bold']">
        {{ props.title }}
      </h2>
      <span :class="[styles.description, 'text-sm leading-snug']">
        {{ props.description }}
      </span>
      <div class="flex flex-row gap-3 items-center">
        <div class="flex flex-row gap-1 items-center" v-if="props.date_start">
          <span
            v-if="$slots.icon_date"
            :class="[
              styles.icon_date,
              'inline-flex shrink-0 [&>svg]:h-[1.1rem] [&>svg]:w-[1.1rem]',
            ]"
            aria-hidden="true"
          >
            <slot name="icon_date" />
          </span>
          <span
            :class="[styles.subtitle_date, 'text-xs font-bold']"
            v-if="props.subtitle_date_start"
          >
            {{ props.subtitle_date_start }}
          </span>
          <span :class="[styles.date, 'text-xs']"> {{ props.date_start }}</span>
        </div>
        <div class="flex flex-row gap-1 items-center" v-if="props.date_final">
          <span
            v-if="$slots.icon_date"
            :class="[
              styles.icon_date,
              'inline-flex shrink-0 [&>svg]:h-[1rem] [&>svg]:w-[1rem]',
            ]"
            aria-hidden="true"
          >
            <slot name="icon_date" />
          </span>
          <span
            :class="[styles.subtitle_date, 'text-xs font-bold']"
            v-if="props.subtitle_date_final"
            >{{ props.subtitle_date_final }}</span
          >
          <span :class="[styles.date, 'text-xs']"> {{ props.date_final }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useAttrs, computed } from "vue";

const attrs = useAttrs();
export type KiutBannerVariant =
  | "warning"
  | "info"
  | "success"
  | "feature"
  | "danger";

const props = withDefaults(
  defineProps<{
    id?: string;
    title?: string;
    description?: string;
    date_start?: string;
    date_final?: string;
    subtitle_date_start?: string;
    subtitle_date_final?: string;
    variant?: KiutBannerVariant;
  }>(),
  {
    id: "banner-warning",
    title: "Mantenimiento programado de plataforma",
    description:
      "El servicio completo estará fuera de línea durante la ventana de mantenimiento. No se procesarán conversaciones ni notificaciones.",
    variant: "warning",
  },
);

type BannerStyle = {
  container: string;
  title: string;
  description: string;
  subtitle_date: string;
  date: string;
  container_icon: string;
  icon: string;
  icon_date: string;
};

const VARIANT_STYLES: Record<KiutBannerVariant, BannerStyle> = {
  warning: {
    container:
      "bg-orange-50 border-orange-300 dark:bg-stone-800 dark:border-yellow-800",
    title: "text-orange-400",
    description: "text-stone-700 dark:text-zinc-300",
    subtitle_date: "text-black dark:text-gray-300",
    date: "text-gray-500 dark:text-gray-400",
    icon: "text-orange-400",
    container_icon: "bg-orange-200/50 dark:bg-orange-300/20",
    icon_date: "text-stone-400",
  },
  info: {
    container:
      "bg-blue-50 border-blue-200 dark:bg-blue-950/40 dark:border-blue-800",
    title: "text-blue-700 dark:text-blue-300",
    description: "text-slate-700 dark:text-zinc-300",
    subtitle_date: "text-black dark:text-gray-300",
    date: "text-gray-500 dark:text-gray-400",
    icon: "text-blue-500 dark:text-blue-400",
    container_icon: "bg-blue-200/50 dark:bg-blue-300/20",
    icon_date: "text-slate-400",
  },
  success: {
    container:
      "bg-emerald-50 border-emerald-200 dark:bg-emerald-950/40 dark:border-emerald-800",
    title: "text-emerald-700 dark:text-emerald-300",
    description: "text-slate-700 dark:text-zinc-300",
    subtitle_date: "text-black dark:text-gray-300",
    date: "text-gray-500 dark:text-gray-400",
    icon: "text-emerald-500 dark:text-emerald-400",
    container_icon: "bg-emerald-200/50 dark:bg-emerald-300/20",
    icon_date: "text-slate-400",
  },
  feature: {
    container:
      "bg-violet-50 border-violet-200 dark:bg-violet-950/40 dark:border-violet-800",
    title: "text-violet-700 dark:text-violet-300",
    description: "text-slate-700 dark:text-zinc-300",
    subtitle_date: "text-black dark:text-gray-300",
    date: "text-gray-500 dark:text-gray-400",
    icon: "text-violet-500 dark:text-violet-400",
    container_icon: "bg-violet-200/50 dark:bg-violet-300/20",
    icon_date: "text-slate-400",
  },
  danger: {
    container:
      "bg-red-50 border-red-200 dark:bg-red-950/40 dark:border-red-800",
    title: "text-red-700 dark:text-red-300",
    description: "text-slate-700 dark:text-zinc-300",
    subtitle_date: "text-black dark:text-gray-300",
    date: "text-gray-500 dark:text-gray-400",
    icon: "text-red-500 dark:text-red-400",
    container_icon: "bg-red-200/50 dark:bg-red-300/20",
    icon_date: "text-slate-400",
  },
};

const styles = computed(() => VARIANT_STYLES[props.variant]);
</script>
