<template>
  <component :is="rootTag" :class="rootClass">
    <div v-if="variant === 'footer'" class="footer-divider"></div>
    <div class="export-actions" :class="{ 'export-actions--inline': variant === 'inline' }">
      <span v-if="variant === 'footer'" class="export-label">Export</span>
      <div class="export-buttons">
        <button
          v-if="showFormat('pdf')"
          type="button"
          class="export-btn"
          :class="{ 'is-loading': loading }"
          :disabled="loading"
          title="Download PDF"
          @click="handleExport('pdf')"
        >
          <svg
            v-if="loading"
            class="spinner"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
          >
            <circle cx="12" cy="12" r="10" stroke-opacity="0.25" />
            <path d="M12 2a10 10 0 0 1 10 10" />
          </svg>
          <svg
            v-else
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
          </svg>
          <span>PDF</span>
        </button>
        <button
          v-if="showFormat('csv')"
          type="button"
          class="export-btn"
          :class="{ 'is-loading': loading }"
          :disabled="loading"
          title="Download CSV"
          @click="handleExport('csv')"
        >
          <svg
            v-if="loading"
            class="spinner"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
          >
            <circle cx="12" cy="12" r="10" stroke-opacity="0.25" />
            <path d="M12 2a10 10 0 0 1 10 10" />
          </svg>
          <svg
            v-else
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="12" y1="18" x2="12" y2="12"></line>
            <line x1="9" y1="15" x2="15" y2="15"></line>
          </svg>
          <span>CSV</span>
        </button>
      </div>
    </div>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export type ExportFormat = 'pdf' | 'csv'
export type FooterExportVariant = 'footer' | 'inline'

const props = withDefaults(defineProps<{
  formats?: ExportFormat[]
  loading?: boolean
  variant?: FooterExportVariant
}>(), {
  formats: () => ['pdf', 'csv'],
  loading: false,
  variant: 'footer',
})

const emit = defineEmits<{
  export: [format: ExportFormat]
}>()

const rootTag = computed(() => (props.variant === 'footer' ? 'footer' : 'div'))
const rootClass = computed(() =>
  props.variant === 'footer' ? 'chart-footer' : 'chart-export-inline',
)

const showFormat = (format: ExportFormat): boolean => {
  return props.formats.includes(format)
}

const handleExport = (format: ExportFormat) => {
  if (!props.loading) {
    emit('export', format)
  }
}
</script>

<style scoped>
.chart-footer {
  margin-top: 20px;
}

.chart-export-inline {
  margin: 0;
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.footer-divider {
  height: 1px;
  background: linear-gradient(
    to right,
    transparent 0%,
    var(--kiut-border-light, rgba(0, 0, 0, 0.05)) 20%,
    var(--kiut-border-color, rgba(93, 75, 147, 0.1)) 50%,
    var(--kiut-border-light, rgba(0, 0, 0, 0.05)) 80%,
    transparent 100%
  );
  margin-bottom: 16px;
}

.export-actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
}

.export-actions--inline {
  justify-content: flex-start;
}

.export-label {
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--kiut-text-muted, #94a3b8);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.export-buttons {
  display: flex;
  align-items: center;
  gap: 8px;
}

.chart-export-inline .export-buttons {
  flex-direction: column;
  align-items: stretch;
  gap: 6px;
}

.export-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  font-size: 0.75rem;
  font-weight: 500;
  font-family:
    var(--kiut-font-ui, ui-sans-serif, system-ui, sans-serif),
    'Inter',
    'DM Sans',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--kiut-text-secondary, #64748b);
  background: transparent;
  border: 1px solid var(--kiut-border-light, rgba(0, 0, 0, 0.05));
  border-radius: 6px;
  text-decoration: none;
  transition: all 0.2s ease;
  cursor: pointer;
}

.chart-export-inline .export-btn {
  padding: 0 6px;
  font-size: 10px;
  font-family:
    'Inter',
    var(--kiut-font-ui, ui-sans-serif, system-ui, sans-serif),
    sans-serif;
  line-height: 1.25;
}

.chart-export-inline .export-btn svg {
  width: 12px;
  height: 12px;
}

.export-btn:hover:not(:disabled) {
  color: var(--kiut-primary, #8b5cf6);
  background: var(--kiut-bg-stats-badge, #fafafa);
  border-color: var(--kiut-border-color, rgba(93, 75, 147, 0.1));
}

.export-btn:active:not(:disabled) {
  transform: scale(0.97);
}

.export-btn:disabled {
  cursor: not-allowed;
  opacity: 0.7;
}

.export-btn.is-loading {
  color: var(--kiut-primary, #8b5cf6);
  border-color: var(--kiut-border-color, rgba(93, 75, 147, 0.2));
}

.export-btn svg {
  opacity: 0.7;
  transition: opacity 0.2s ease;
}

.export-btn:hover:not(:disabled) svg {
  opacity: 1;
}

.spinner {
  animation: spin 0.8s linear infinite;
  opacity: 1 !important;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 768px) {
  .export-buttons {
    gap: 6px;
  }

  .chart-footer .export-btn span {
    display: none;
  }

  .chart-footer .export-btn {
    padding: 8px;
  }
}
</style>
