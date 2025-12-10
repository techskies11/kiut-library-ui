<template>
  <footer class="chart-footer">
    <div class="footer-divider"></div>
    <div class="export-actions">
      <span class="export-label">Export</span>
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
          <!-- Loading spinner -->
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
          <!-- PDF icon -->
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
          <!-- Loading spinner -->
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
          <!-- CSV icon -->
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
  </footer>
</template>

<script setup lang="ts">
export type ExportFormat = 'pdf' | 'csv'

const props = withDefaults(defineProps<{
  /**
   * Array of export formats to display
   * @default ['pdf', 'csv']
   */
  formats?: ExportFormat[]
  /**
   * Loading state (shows spinner on all buttons)
   * @default false
   */
  loading?: boolean
}>(), {
  formats: () => ['pdf', 'csv'],
  loading: false
})

const emit = defineEmits<{
  /**
   * Emitted when an export button is clicked
   * @param format - The export format type ('pdf' | 'csv')
   */
  export: [format: ExportFormat]
}>()

/**
 * Check if a format should be displayed
 */
const showFormat = (format: ExportFormat): boolean => {
  return props.formats.includes(format)
}

/**
 * Handle export button click
 */
const handleExport = (format: ExportFormat) => {
  if (!props.loading) {
    emit('export', format)
  }
}
</script>

<style scoped>
/* Chart Footer */
.chart-footer {
  margin-top: 20px;
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

.export-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  font-size: 0.75rem;
  font-weight: 500;
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  color: var(--kiut-text-secondary, #64748b);
  background: transparent;
  border: 1px solid var(--kiut-border-light, rgba(0, 0, 0, 0.05));
  border-radius: 6px;
  text-decoration: none;
  transition: all 0.2s ease;
  cursor: pointer;
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

/* Spinner animation */
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

/* Responsive */
@media (max-width: 768px) {
  .export-buttons {
    gap: 6px;
  }

  .export-btn span {
    display: none;
  }

  .export-btn {
    padding: 8px;
  }
}
</style>
