<template>
  <section
    class="font-['Inter',system-ui,sans-serif] text-[color:var(--kiut-text-primary)]"
    data-testid="notifications"
  >
    <p class="mb-5 max-w-4xl text-sm leading-relaxed text-[color:var(--kiut-text-secondary)]">
      <slot name="intro">{{ intro }}</slot>
    </p>

    <div
      class="overflow-hidden rounded-xl border border-[color:var(--kiut-border-light)] bg-[color:var(--kiut-bg-secondary)]"
    >
      <div
        class="grid grid-cols-[minmax(0,1.4fr)_minmax(16rem,1fr)_7.5rem] items-center gap-4 border-b border-[color:var(--kiut-border-light)] px-5 py-3 text-[11px] font-medium uppercase tracking-[0.08em] text-[color:var(--kiut-text-muted)]"
      >
        <span>{{ columnNotice }}</span>
        <span>{{ columnRoles }}</span>
        <span class="text-right leading-tight">{{ columnUser }}</span>
      </div>

      <ul>
        <li
          v-for="item in items"
          :key="item.id"
          class="grid grid-cols-[minmax(0,1.4fr)_minmax(16rem,1fr)_7.5rem] items-center gap-4 border-b border-[color:var(--kiut-border-light)] px-5 py-4 last:border-b-0"
          :data-testid="`notification-row-${item.id}`"
        >
          <div class="min-w-0">
            <p class="text-sm font-semibold leading-snug">{{ item.title }}</p>
            <p class="mt-0.5 text-[13px] leading-snug text-[color:var(--kiut-text-secondary)]">
              {{ item.description }}
            </p>
          </div>

          <div class="flex flex-wrap items-center gap-1.5">
            <span
              v-if="item.roleIds.length === 0"
              class="inline-flex h-8 items-center rounded-full border border-dashed border-[color:var(--kiut-border-color)] px-3 text-xs text-[color:var(--kiut-text-muted)]"
            >
              {{ emptyRoles }}
            </span>
            <button
              v-for="role in visibleRoles(item)"
              :key="role.id"
              type="button"
              class="inline-flex h-8 max-w-[10rem] items-center truncate rounded-full border border-[color:var(--kiut-border-color)] bg-[color:var(--kiut-bg-primary)] px-3 text-xs font-medium text-[color:var(--kiut-text-primary)] transition-colors hover:border-[color:var(--kiut-text-muted)]"
              :title="removeRoleLabel"
              :data-testid="`notification-role-${item.id}-${role.id}`"
              @click="removeRole(item, role.id)"
            >
              {{ role.label }}
            </button>
            <button
              v-if="hiddenCount(item) > 0 && !expanded[item.id]"
              type="button"
              class="inline-flex h-8 items-center rounded-full border border-[color:var(--kiut-border-color)] bg-[color:var(--kiut-bg-primary)] px-3 text-xs font-medium"
              @click="expanded[item.id] = true"
            >
              {{ moreLabel(hiddenCount(item)) }}
            </button>
            <div class="relative">
              <button
                type="button"
                class="inline-flex size-8 items-center justify-center rounded-full border border-[color:var(--kiut-border-color)] bg-[color:var(--kiut-bg-primary)] text-base leading-none text-[color:var(--kiut-text-secondary)] transition-colors hover:border-[color:var(--kiut-text-muted)] hover:text-[color:var(--kiut-text-primary)]"
                :aria-label="addRoleLabel"
                :aria-expanded="openMenuId === item.id"
                :data-testid="`notification-add-${item.id}`"
                @click="toggleMenu(item.id)"
              >
                +
              </button>
              <ul
                v-if="openMenuId === item.id"
                class="absolute left-0 z-20 mt-1 max-h-48 min-w-[11rem] overflow-auto rounded-lg border border-[color:var(--kiut-border-light)] bg-[color:var(--kiut-bg-secondary)] py-1 shadow-lg"
                role="listbox"
              >
                <li
                  v-if="availableRoles(item).length === 0"
                  class="px-3 py-2 text-xs text-[color:var(--kiut-text-muted)]"
                >
                  {{ noMoreRoles }}
                </li>
                <li v-for="role in availableRoles(item)" :key="role.id">
                  <button
                    type="button"
                    class="flex w-full px-3 py-2 text-left text-sm hover:bg-[color:var(--kiut-bg-primary)]"
                    role="option"
                    @click="addRole(item, role.id)"
                  >
                    {{ role.label }}
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div class="flex justify-end">
            <span
              class="inline-flex size-6 items-center justify-center rounded-full border"
              :class="
                item.userLinked
                  ? 'border-emerald-500 bg-emerald-500 text-white'
                  : 'border-[color:var(--kiut-border-color)] text-transparent'
              "
              :aria-label="item.userLinked ? userLinkedLabel : userUnlinkedLabel"
            >
              <svg viewBox="0 0 16 16" class="size-3.5" fill="none" aria-hidden="true">
                <path
                  d="M3.5 8.2 6.4 11l6.1-6.2"
                  stroke="currentColor"
                  stroke-width="1.8"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
          </div>
        </li>
      </ul>
    </div>

    <p class="mt-4 flex items-center gap-2 text-sm text-[color:var(--kiut-text-secondary)]">
      <svg viewBox="0 0 20 20" class="size-4 shrink-0" fill="none" aria-hidden="true">
        <path
          d="M10 3.2a4.2 4.2 0 0 0-4.2 4.2v2.1L4.4 11.6a.8.8 0 0 0 .6 1.3h10a.8.8 0 0 0 .6-1.3L14.2 9.5V7.4A4.2 4.2 0 0 0 10 3.2Z"
          stroke="currentColor"
          stroke-width="1.4"
        />
        <path d="M8.2 14.2a1.8 1.8 0 0 0 3.6 0" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" />
      </svg>
      <span>
        {{ footerBefore }}
        <button
          type="button"
          class="font-medium text-emerald-600 underline-offset-2 hover:underline dark:text-emerald-400"
          data-testid="notifications-preferences"
          @click="emit('preferences')"
        >
          {{ footerLink }}
        </button>
        {{ footerAfter }}
      </span>
    </p>
  </section>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import type { NotificationItem, NotificationRole } from './notificationTypes';

defineOptions({ name: 'Notifications' });

export type { NotificationItem, NotificationRole };

const props = withDefaults(
  defineProps<{
    items: NotificationItem[];
    roles: NotificationRole[];
    intro?: string;
    columnNotice?: string;
    columnRoles?: string;
    columnUser?: string;
    emptyRoles?: string;
    addRoleLabel?: string;
    removeRoleLabel?: string;
    noMoreRoles?: string;
    userLinkedLabel?: string;
    userUnlinkedLabel?: string;
    footerBefore?: string;
    footerLink?: string;
    footerAfter?: string;
    /** Roles shown before the overflow pill. */
    maxVisibleRoles?: number;
  }>(),
  {
    intro:
      'Elegí los roles destinatarios de cada aviso entre los roles que la aerolínea creó en Personas → Roles. Cada usuario elige después por qué medio recibirlos desde su menú, en "Mis notificaciones".',
    columnNotice: 'Aviso',
    columnRoles: 'Roles destinatarios',
    columnUser: 'Usuario vinculado',
    emptyRoles: 'Ningún rol',
    addRoleLabel: 'Agregar rol',
    removeRoleLabel: 'Quitar rol',
    noMoreRoles: 'No hay más roles',
    userLinkedLabel: 'Usuario vinculado',
    userUnlinkedLabel: 'Sin usuario vinculado',
    footerBefore: 'Cada usuario define sus medios en',
    footerLink: 'Mis notificaciones',
    footerAfter: '.',
    maxVisibleRoles: 2,
  },
);

const emit = defineEmits<{
  'update:items': [items: NotificationItem[]];
  preferences: [];
}>();

const openMenuId = ref<string | null>(null);
const expanded = reactive<Record<string, boolean>>({});

function roleById(id: string): NotificationRole | undefined {
  return props.roles.find((role) => role.id === id);
}

function resolvedRoles(item: NotificationItem): NotificationRole[] {
  return item.roleIds
    .map((id) => roleById(id))
    .filter((role): role is NotificationRole => role !== undefined);
}

function visibleRoles(item: NotificationItem): NotificationRole[] {
  const roles = resolvedRoles(item);
  if (expanded[item.id]) return roles;
  return roles.slice(0, props.maxVisibleRoles);
}

function hiddenCount(item: NotificationItem): number {
  return Math.max(0, resolvedRoles(item).length - props.maxVisibleRoles);
}

function moreLabel(count: number): string {
  return `+${count} más`;
}

function availableRoles(item: NotificationItem): NotificationRole[] {
  const taken = new Set(item.roleIds);
  return props.roles.filter((role) => !taken.has(role.id));
}

function toggleMenu(itemId: string): void {
  openMenuId.value = openMenuId.value === itemId ? null : itemId;
}

function patch(item: NotificationItem, roleIds: string[]): void {
  emit(
    'update:items',
    props.items.map((current) => (current.id === item.id ? { ...current, roleIds } : current)),
  );
}

function addRole(item: NotificationItem, roleId: string): void {
  if (!item.roleIds.includes(roleId)) patch(item, [...item.roleIds, roleId]);
  openMenuId.value = null;
}

function removeRole(item: NotificationItem, roleId: string): void {
  patch(item, item.roleIds.filter((id) => id !== roleId));
}
</script>
