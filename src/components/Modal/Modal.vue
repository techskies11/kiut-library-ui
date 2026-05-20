<template>
  <Teleport to="body">
    <Transition name="kiut-modal">
      <div
        v-if="modelValue"
        class="ku:fixed ku:inset-0 ku:z-[200] ku:flex ku:items-center ku:justify-center ku:p-4 ku:[font-family:'Inter',sans-serif]"
        aria-hidden="false"
      >
      <div
        class="ku:absolute ku:inset-0 ku:bg-slate-900/50 ku:backdrop-blur-[2px] ku:dark:bg-black/60"
        aria-hidden="true"
        @click="handleCancel"
      />
      <div
        ref="panelRef"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="titleId"
        tabindex="-1"
        class="kiut-modal-panel ku:relative ku:z-10 ku:flex ku:max-h-[min(90vh,880px)] ku:w-full ku:max-w-lg ku:flex-col ku:overflow-hidden ku:rounded-2xl ku:border ku:border-[color:var(--kiut-border-light)] ku:bg-[color:var(--kiut-bg-secondary)] ku:shadow-[var(--kiut-shadow-card)] ku:dark:bg-[#252528] ku:dark:shadow-black/40"
        @click.stop
      >
        <header
          class="ku:flex ku:shrink-0 ku:justify-between ku:gap-4 ku:border-b ku:border-slate-100 ku:bg-slate-50/50 ku:px-6 ku:py-5 ku:dark:border-[color:var(--kiut-border-light)] ku:dark:bg-white/[0.02]"
          :class="subtitle ? 'ku:items-start' : 'ku:items-center'"
        >
          <div class="ku:min-w-0 ku:flex-1 ku:space-y-1">
            <h2
              :id="titleId"
              class="ku:text-xl ku:font-semibold ku:leading-tight ku:tracking-tight ku:text-[color:var(--kiut-text-primary)] ku:dark:text-slate-100"
            >
              {{ title }}
            </h2>
            <p
              v-if="subtitle"
              class="ku:text-sm ku:leading-snug ku:text-[color:var(--kiut-text-secondary)] ku:dark:text-slate-400"
            >
              {{ subtitle }}
            </p>
          </div>
          <Button
            variant="action"
            type="button"
            class="ku:shrink-0"
            @click="handleCancel"
          >
            <template #icon>
              <XMarkIcon class="ku:h-5 ku:w-5" />
            </template>
          </Button>
        </header>

        <div class="ku:min-h-0 ku:flex-1 ku:overflow-y-auto ku:px-6 ku:py-6">
          <slot />
        </div>

        <footer class="ku:flex ku:shrink-0 ku:justify-end ku:gap-3 ku:px-6 ku:pb-6 ku:pt-2">
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
  'ku:update:modelValue': [value: boolean];
  cancel: [];
  confirm: [];
}>();

const uid = `kiut-modal-${randomInstanceSuffix()}`;
const titleId = `${uid}-title`;
const panelRef = ref<HTMLElement | null>(null);

function handleCancel() {
  emit('cancel');
  emit('ku:update:modelValue', false);
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
