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
            <p v-if="item.hint" class="mt-1 text-xs leading-snug text-[color:var(--kiut-text-muted)]">
              {{ item.hint }}
            </p>
          </div>

          <div class="flex flex-wrap items-center gap-1.5">
            <span
              v-if="item.roleIds.length === 0"
              class="inline-flex h-8 items-center rounded-full border border-dashed border-[color:var(--kiut-border-color)] px-3 text-xs text-[color:var(--kiut-text-muted)]"
            >
              {{ emptyRoles }}
            </span>
            <span
              v-else-if="allRolesSelected(item)"
              class="inline-flex h-8 items-center rounded-full border border-[color:var(--kiut-border-color)] bg-[color:var(--kiut-bg-primary)] px-3 text-xs font-medium"
            >
              {{ allRolesText }}
            </span>
            <template v-else>
              <span
                v-for="role in visibleRoles(item)"
                :key="role.id"
                class="inline-flex h-8 max-w-[10rem] items-center truncate rounded-full border border-[color:var(--kiut-border-color)] bg-[color:var(--kiut-bg-primary)] px-3 text-xs font-medium"
              >
                {{ role.label }}
              </span>
              <span
                v-if="hiddenCount(item) > 0"
                class="inline-flex h-8 items-center rounded-full border border-[color:var(--kiut-border-color)] bg-[color:var(--kiut-bg-primary)] px-3 text-xs font-medium"
                :title="hiddenRoleNames(item)"
              >
                {{ moreLabel(hiddenCount(item)) }}
              </span>
            </template>

            <div class="relative" :data-menu="item.id">
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
                class="absolute left-0 z-20 mt-1 max-h-56 min-w-[14rem] overflow-auto rounded-lg border border-[color:var(--kiut-border-light)] bg-[color:var(--kiut-bg-secondary)] py-1 shadow-lg"
                role="listbox"
                aria-multiselectable="true"
              >
                <li>
                  <label class="flex cursor-pointer items-center gap-2 px-3 py-2 text-sm hover:bg-[color:var(--kiut-bg-primary)]">
                    <input
                      type="checkbox"
                      class="size-3.5 accent-emerald-600"
                      :checked="allRolesSelected(item)"
                      @change="toggleAll(item)"
                    />
                    {{ selectAllLabel }}
                  </label>
                </li>
                <li v-for="role in roles" :key="role.id">
                  <label class="flex cursor-pointer items-center gap-2 px-3 py-2 text-sm hover:bg-[color:var(--kiut-bg-primary)]">
                    <input
                      type="checkbox"
                      class="size-3.5 accent-emerald-600"
                      :checked="item.roleIds.includes(role.id)"
                      @change="toggleRole(item, role.id)"
                    />
                    {{ role.label }}
                  </label>
                </li>
              </ul>
            </div>
          </div>

          <div class="flex justify-end">
            <button
              type="button"
              class="inline-flex size-6 items-center justify-center rounded-full border"
              :class="linkClass(item)"
              :disabled="item.userLinkMode !== 'editable'"
              :title="linkTooltip(item)"
              :aria-pressed="isLinked(item)"
              :data-testid="`notification-user-${item.id}`"
              @click="toggleLinked(item)"
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
        <path
          d="M8.2 14.2a1.8 1.8 0 0 0 3.6 0"
          stroke="currentColor"
          stroke-width="1.4"
          stroke-linecap="round"
        />
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
import { computed, onMounted, onUnmounted, ref } from 'vue';
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
    /** Use `{count}` for the number of roles. */
    allRolesLabel?: string;
    linkedTooltip?: string;
    unlinkedTooltip?: string;
    footerBefore?: string;
    footerLink?: string;
    footerAfter?: string;
    maxVisibleRoles?: number;
  }>(),
  {
    intro:
      'Elegí los roles destinatarios de cada notificación. Luego cada usuario podrá desactivar las que considere desde su perfil',
    columnNotice: 'Aviso',
    columnRoles: 'Roles destinatarios',
    columnUser: 'Usuario vinculado',
    emptyRoles: 'Ningún rol',
    addRoleLabel: 'Agregar rol',
    selectAllLabel: 'Seleccionar todos',
    allRolesLabel: 'Todos los roles ({count})',
    linkedTooltip: 'Le llega a la persona asociada al hecho.',
    unlinkedTooltip: 'Este aviso no está vinculado a un usuario en particular.',
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

const allRolesText = computed(() =>
  props.allRolesLabel.replace('{count}', String(props.roles.length)),
);

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

function hiddenRoleNames(item: NotificationItem): string {
  return resolvedRoles(item)
    .slice(props.maxVisibleRoles)
    .map((role) => role.label)
    .join(', ');
}

function moreLabel(count: number): string {
  return `+${count} más`;
}

function isLinked(item: NotificationItem): boolean {
  if (item.userLinkMode === 'locked-on') return true;
  if (item.userLinkMode === 'locked-off') return false;
  return item.userLinked;
}

function linkTooltip(item: NotificationItem): string {
  return item.userLinkMode === 'locked-off' ? props.unlinkedTooltip : props.linkedTooltip;
}

function linkClass(item: NotificationItem): string {
  const on = isLinked(item);
  const locked = item.userLinkMode !== 'editable';
  if (on) {
    return locked
      ? 'cursor-not-allowed border-emerald-500 bg-emerald-500 text-white opacity-80'
      : 'border-emerald-500 bg-emerald-500 text-white';
  }
  return locked
    ? 'cursor-not-allowed border-[color:var(--kiut-border-color)] text-transparent opacity-70'
    : 'border-[color:var(--kiut-border-color)] text-transparent hover:border-[color:var(--kiut-text-muted)]';
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

function toggleLinked(item: NotificationItem): void {
  if (item.userLinkMode !== 'editable') return;
  patch(item, { userLinked: !item.userLinked });
}

function onPointerDown(event: PointerEvent): void {
  const target = event.target;
  if (!(target instanceof Element)) return;
  if (target.closest('[data-menu]')) return;
  openMenuId.value = null;
}

onMounted(() => document.addEventListener('pointerdown', onPointerDown));
onUnmounted(() => document.removeEventListener('pointerdown', onPointerDown));
</script>
