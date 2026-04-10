<template>
  <Teleport to="body">
    <Transition name="kiut-modal">
      <div
        v-if="modelValue"
        class="fixed inset-0 z-[200] flex items-center justify-center p-4 [font-family:'Inter',sans-serif]"
        aria-hidden="false"
      >
      <div
        class="absolute inset-0 bg-slate-900/50 backdrop-blur-[2px] dark:bg-black/60"
        aria-hidden="true"
        @click="handleCancel"
      />
      <div
        ref="panelRef"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="titleId"
        tabindex="-1"
        class="kiut-modal-panel relative z-10 flex max-h-[min(90vh,880px)] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-[color:var(--kiut-border-light)] bg-[color:var(--kiut-bg-secondary)] shadow-[var(--kiut-shadow-card)] dark:bg-[#252528] dark:shadow-black/40"
        @click.stop
      >
        <header
          class="flex shrink-0 justify-between gap-4 border-b border-slate-100 bg-slate-50/50 px-6 py-5 dark:border-[color:var(--kiut-border-light)] dark:bg-white/[0.02]"
          :class="subtitle ? 'items-start' : 'items-center'"
        >
          <div class="min-w-0 flex-1 space-y-1">
            <h2
              :id="titleId"
              class="text-xl font-semibold leading-tight tracking-tight text-[color:var(--kiut-text-primary)] dark:text-slate-100"
            >
              {{ title }}
            </h2>
            <p
              v-if="subtitle"
              class="text-sm leading-snug text-[color:var(--kiut-text-secondary)] dark:text-slate-400"
            >
              {{ subtitle }}
            </p>
          </div>
          <Button
            variant="action"
            type="button"
            class="shrink-0"
            @click="handleCancel"
          >
            <template #icon>
              <XMarkIcon class="h-5 w-5" />
            </template>
          </Button>
        </header>

        <div class="min-h-0 flex-1 overflow-y-auto px-6 py-6">
          <slot />
        </div>

        <footer class="flex shrink-0 justify-end gap-3 px-6 pb-6 pt-2">
          <Button variant="secondary" type="button" @click="handleCancel">
            {{ cancelLabel }}
          </Button>
          <Button variant="primary" type="button" @click="handleConfirm">
            {{ confirmLabel }}
          </Button>
        </footer>
      </div>
    </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { XMarkIcon } from '@heroicons/vue/24/outline';
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { randomInstanceSuffix } from '../../utils/randomId';
import Button from '../Button/Button.vue';

defineOptions({ name: 'Modal' });

const props = withDefaults(
  defineProps<{
    /** Visibilidad del modal (`v-model`). */
    modelValue: boolean;
    title: string;
    subtitle?: string;
    cancelLabel?: string;
    confirmLabel?: string;
  }>(),
  {
    cancelLabel: 'Cancelar',
    confirmLabel: 'Guardar',
  }
);

const emit = defineEmits<{
  'update:modelValue': [value: boolean];
  cancel: [];
  confirm: [];
}>();

const uid = `kiut-modal-${randomInstanceSuffix()}`;
const titleId = `${uid}-title`;
const panelRef = ref<HTMLElement | null>(null);

function handleCancel() {
  emit('cancel');
  emit('update:modelValue', false);
}

function handleConfirm() {
  emit('confirm');
}

function onDocumentKeydown(e: KeyboardEvent) {
  if (!props.modelValue) return;
  if (e.key === 'Escape') {
    e.preventDefault();
    handleCancel();
  }
}

watch(
  () => props.modelValue,
  (open) => {
    if (open) {
      requestAnimationFrame(() => {
        panelRef.value?.focus({ preventScroll: true });
      });
    }
  }
);

onMounted(() => {
  document.addEventListener('keydown', onDocumentKeydown);
});

onUnmounted(() => {
  document.removeEventListener('keydown', onDocumentKeydown);
});
</script>

<style scoped>
.kiut-modal-enter-active,
.kiut-modal-leave-active {
  transition: opacity 0.3s ease;
}

.kiut-modal-enter-from,
.kiut-modal-leave-to {
  opacity: 0;
}

.kiut-modal-enter-active .kiut-modal-panel,
.kiut-modal-leave-active .kiut-modal-panel {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.kiut-modal-enter-from .kiut-modal-panel,
.kiut-modal-leave-to .kiut-modal-panel {
  opacity: 0;
  transform: translateY(16px) scale(0.96);
}
</style>
