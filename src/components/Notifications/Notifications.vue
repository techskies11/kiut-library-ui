<template>
  <section
    class="font-['Inter',system-ui,sans-serif] text-[color:var(--kiut-text-primary)]"
    data-testid="notifications"
  >
    <p class="mb-5 max-w-5xl text-[15px] leading-relaxed text-[color:var(--kiut-text-secondary)]">
      <slot name="intro">{{ intro }}</slot>
    </p>

    <div
      class="overflow-visible rounded-xl border border-slate-200 bg-white dark:border-[#2c2c34] dark:bg-[#1c1c21]"
    >
      <div
        class="notifications-grid notifications-grid--head border-b border-slate-200 px-5 py-3 text-[11px] font-medium uppercase tracking-[0.12em] text-slate-400 dark:border-[#2c2c34] dark:text-[#8d8d98]"
      >
        <span>{{ columnNotice }}</span>
        <span>{{ columnRoles }}</span>
        <span class="ml-auto max-w-[5.5rem] text-right leading-tight">{{ columnUser }}</span>
      </div>

      <ul>
        <li
          v-for="item in items"
          :key="item.id"
          class="notifications-grid border-b border-slate-200 px-5 py-4 last:border-b-0 dark:border-[#2a2a31]"
          :data-testid="`notification-row-${item.id}`"
        >
          <div class="min-w-0">
            <p class="text-[15px] font-semibold leading-snug">{{ item.title }}</p>
            <p class="mt-0.5 text-[13px] leading-snug text-slate-500 dark:text-[#8f8f9a]">
              {{ item.description }}
            </p>
          </div>

          <div class="flex flex-wrap items-center gap-2">
            <span
              v-if="item.roleIds.length === 0"
              class="inline-flex h-8 items-center rounded-full border border-slate-200 bg-slate-50 px-3.5 text-[13px] text-slate-400 dark:border-[#34343c] dark:bg-[#24242a] dark:text-[#7c7c88]"
            >
              {{ emptyRoles }}
            </span>
            <span
              v-else-if="allRolesSelected(item)"
              :class="pillClass"
            >
              {{ allRolesLabel(roles.length) }}
            </span>
            <template v-else>
              <span
                v-for="role in visibleRoles(item)"
                :key="role.id"
                :class="pillClass"
                :data-testid="`notification-role-${item.id}-${role.id}`"
              >
                {{ role.label }}
              </span>
              <span
                v-if="hiddenCount(item) > 0"
                :class="pillClass"
                :title="hiddenRoleLabels(item)"
              >
                {{ moreLabel(hiddenCount(item)) }}
              </span>
            </template>

            <div class="relative">
              <button
                type="button"
                class="inline-flex size-8 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-lg leading-none text-slate-500 transition-colors hover:text-slate-800 dark:border-[#3a3a44] dark:bg-[#24242a] dark:text-[#c7c7d1] dark:hover:text-white"
                :aria-label="addRoleLabel"
                :aria-expanded="openMenuId === item.id"
                :data-testid="`notification-add-${item.id}`"
                @click="toggleMenu(item.id)"
              >
                +
              </button>
              <div
                v-if="openMenuId === item.id"
                class="absolute left-0 z-20 mt-1 min-w-[14rem] rounded-lg border border-[color:var(--kiut-border-light)] bg-[color:var(--kiut-bg-secondary)] py-1 shadow-lg"
                role="group"
                :aria-label="addRoleLabel"
              >
                <label class="flex cursor-pointer items-center gap-2 px-3 py-2 text-sm hover:bg-[color:var(--kiut-bg-primary)]">
                  <input
                    type="checkbox"
                    class="size-3.5 accent-emerald-600"
                    :checked="allRolesSelected(item)"
                    @change="toggleAll(item)"
                  />
                  {{ selectAllLabel }}
                </label>
                <label
                  v-for="role in roles"
                  :key="role.id"
                  class="flex cursor-pointer items-center gap-2 px-3 py-2 text-sm hover:bg-[color:var(--kiut-bg-primary)]"
                >
                  <input
                    type="checkbox"
                    class="size-3.5 accent-emerald-600"
                    :checked="item.roleIds.includes(role.id)"
                    @change="toggleRole(item, role.id)"
                  />
                  {{ role.label }}
                </label>
              </div>
            </div>
          </div>

          <div class="flex justify-end pr-1">
            <button
              type="button"
              class="inline-flex size-[22px] items-center justify-center rounded-full border"
              :class="[
                item.userLinked
                  ? 'border-[#3dce7a] bg-[#3dce7a] text-white'
                  : 'border-[#5a5a66] bg-transparent text-transparent dark:border-[#4a4a55]',
                item.userLinkedEditable ? 'cursor-pointer' : 'cursor-default',
              ]"
              :disabled="!item.userLinkedEditable"
              :title="userLinkedTooltip(item)"
              :aria-pressed="item.userLinked"
              :data-testid="`notification-user-${item.id}`"
              @click="toggleUserLinked(item)"
            >
              <svg viewBox="0 0 16 16" class="size-3" fill="none" aria-hidden="true">
                <path
                  d="M3.5 8.2 6.4 11l6.1-6.2"
                  stroke="currentColor"
                  stroke-width="1.8"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
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
import { ref } from 'vue';
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
    selectAllLabel?: string;
    allRolesLabel?: (count: number) => string;
    userLinkedHint?: string;
    userLinkedLockedHint?: string;
    footerBefore?: string;
    footerLink?: string;
    footerAfter?: string;
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
    selectAllLabel: 'Seleccionar todos',
    allRolesLabel: (count: number) => `Todos los roles (${count})`,
    userLinkedHint: 'Le llega a la persona asociada al hecho.',
    userLinkedLockedHint: 'Este aviso no está vinculado a un usuario en particular.',
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

const pillClass =
  'inline-flex h-8 max-w-[11rem] items-center truncate rounded-full border border-slate-200 bg-slate-50 px-3.5 text-[13px] font-medium text-slate-800 dark:border-[#3a3a44] dark:bg-[#2a2a32] dark:text-[#ececf1]';

function roleById(id: string): NotificationRole | undefined {
  return props.roles.find((role) => role.id === id);
}

function resolvedRoles(item: NotificationItem): NotificationRole[] {
  return item.roleIds
    .map((id) => roleById(id))
    .filter((role): role is NotificationRole => role !== undefined);
}

function allRolesSelected(item: NotificationItem): boolean {
  return props.roles.length > 0 && props.roles.every((role) => item.roleIds.includes(role.id));
}

function visibleRoles(item: NotificationItem): NotificationRole[] {
  return resolvedRoles(item).slice(0, props.maxVisibleRoles);
}

function hiddenCount(item: NotificationItem): number {
  return Math.max(0, resolvedRoles(item).length - props.maxVisibleRoles);
}

function hiddenRoleLabels(item: NotificationItem): string {
  return resolvedRoles(item)
    .slice(props.maxVisibleRoles)
    .map((role) => role.label)
    .join(', ');
}

function moreLabel(count: number): string {
  return `+${count} más`;
}

function toggleMenu(itemId: string): void {
  openMenuId.value = openMenuId.value === itemId ? null : itemId;
}

function patch(item: NotificationItem, next: Partial<NotificationItem>): void {
  emit(
    'update:items',
    props.items.map((current) => (current.id === item.id ? { ...current, ...next } : current)),
  );
}

function toggleRole(item: NotificationItem, roleId: string): void {
  const roleIds = item.roleIds.includes(roleId)
    ? item.roleIds.filter((id) => id !== roleId)
    : [...item.roleIds, roleId];
  patch(item, { roleIds });
}

function toggleAll(item: NotificationItem): void {
  patch(item, {
    roleIds: allRolesSelected(item) ? [] : props.roles.map((role) => role.id),
  });
}

function userLinkedTooltip(item: NotificationItem): string {
  if (!item.userLinkedEditable && !item.userLinked) return props.userLinkedLockedHint;
  return props.userLinkedHint;
}

function toggleUserLinked(item: NotificationItem): void {
  if (!item.userLinkedEditable) return;
  patch(item, { userLinked: !item.userLinked });
}
</script>

<style scoped>
.notifications-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.45fr) minmax(16rem, 1fr) 6.5rem;
  column-gap: 1.5rem;
  align-items: center;
}

.notifications-grid--head {
  align-items: end;
}

@media (max-width: 720px) {
  .notifications-grid {
    grid-template-columns: minmax(0, 1fr);
    row-gap: 0.75rem;
  }
}
</style>
