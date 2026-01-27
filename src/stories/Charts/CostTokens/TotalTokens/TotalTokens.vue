<template>
  <article class="total-tokens-card glass">
    <div class="decorative decorative-circle-top"></div>
    <div class="decorative decorative-circle-bottom"></div>

    <header class="header-title">
      <div class="container-title">
        <span class="title">Total Tokens</span>
      </div>
    </header>

    <template v-if="!loading">
      <div class="container-value">
        <div class="value">
          {{ formattedTotalTokens }}
        </div>
      </div>

      <div class="stats-section">
        <div class="stats-grid">
          <div class="stat-item">
            <div class="stat-label">Input</div>
            <div class="stat-value">{{ formattedInputTokens }}</div>
          </div>
          <div class="stat-item">
            <div class="stat-label">Output</div>
            <div class="stat-value">{{ formattedOutputTokens }}</div>
          </div>
          <div class="stat-item">
            <div class="stat-label">Cache Read</div>
            <div class="stat-value">{{ formattedCacheReadTokens }}</div>
          </div>
          <div class="stat-item">
            <div class="stat-label">Cache Write</div>
            <div class="stat-value">{{ formattedCacheWriteTokens }}</div>
          </div>
        </div>
      </div>
    </template>

    <div class="loading-state" v-else>
      <div class="loading-container">
        <div class="chart-lines-loader">
          <div class="line line-1"></div>
          <div class="line line-2"></div>
          <div class="line line-3"></div>
          <div class="line line-4"></div>
          <div class="line line-5"></div>
        </div>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useNumberFormat } from "../../../../plugins/numberFormat";

const props = withDefaults(
  defineProps<{
    totalTokens?: number;
    inputTokens?: number;
    outputTokens?: number;
    cacheReadTokens?: number;
    cacheWriteTokens?: number;
    loading?: boolean;
  }>(),
  {
    totalTokens: 0,
    inputTokens: 0,
    outputTokens: 0,
    cacheReadTokens: 0,
    cacheWriteTokens: 0,
    loading: false,
  }
);

// Formateo de valores numéricos
const formattedTotalTokens = computed(() => useNumberFormat(props.totalTokens));
const formattedInputTokens = computed(() => useNumberFormat(props.inputTokens));
const formattedOutputTokens = computed(() =>
  useNumberFormat(props.outputTokens)
);
const formattedCacheReadTokens = computed(() =>
  useNumberFormat(props.cacheReadTokens)
);
const formattedCacheWriteTokens = computed(() =>
  useNumberFormat(props.cacheWriteTokens)
);
</script>

<style scoped>
.total-tokens-card {
  font-family: "DM Sans", -apple-system, BlinkMacSystemFont, "Segoe UI",
    sans-serif;
  background: white;
  border-radius: 28px;
  border: 1px solid #dbeafe90;
  padding: 1rem;
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 10px 40px -15px rgba(0, 0, 0, 0.12);
  display: flex;
  flex-direction: column;
  height: 100%;
}

.total-tokens-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 50px -15px rgba(0, 0, 0, 0.12);
}

.glass {
  background-image: linear-gradient(to bottom right, #eff6ff, white, #eef2ff);
  backdrop-filter: blur(10px);
}

.decorative {
  position: absolute;
  border-radius: 50%;
}

.decorative-circle-top {
  top: 0px;
  right: 0px;
  width: 8rem;
  height: 8rem;
  background-image: linear-gradient(to bottom right, #dbeafe4c, #c7d2fe4e);
  transform: translateY(-4rem) translateX(4rem);
}

.decorative-circle-bottom {
  bottom: 0;
  left: 0;
  width: 6rem;
  height: 6rem;
  background-image: linear-gradient(to top right, #dbeafe4c, #c7d2fe4e);
  transform: translateY(3rem) translateX(-3rem);
}

.header-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  position: relative;
  z-index: 10;
}

.container-title {
  display: flex;
  align-items: center;
  gap: 2;
}

.title {
  font-weight: 500;
  font-size: 1.125rem;
  line-height: 1.75rem;
  color: #1e2939;
}

.container-value {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 10;
}

.value {
  font-weight: bold;
  background-image: linear-gradient(to right, #2563eb, #4f46e5);
  background-clip: text;
  color: transparent;
  font-size: 1.875rem;
  line-height: 2.25rem;
}

.stats-section {
  padding-top: 0.75rem;
  position: relative;
  z-index: 10;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.375rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
}

.stat-item {
  text-align: center;
  padding: 0.375rem;
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 1.125rem;
  backdrop-filter: blur(4px);
}

.stat-label {
  color: #6a7282;
  font-size: 0.75rem;
  line-height: 1rem;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.025em;
  margin-bottom: 0.125rem;
}

.stat-value {
  font-weight: bold;
  font-size: 1rem;
  color: #1e2939;
}

/* Loading State */
.loading-state {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 180px;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.chart-lines-loader {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 10px;
  height: 100px;
  margin-bottom: 24px;
}

.line {
  width: 8px;
  background: linear-gradient(to top, #93c5fd 0%, #2563eb 50%, #1d4ed8 100%);
  border-radius: 4px;
  animation: wave 1.5s ease-in-out infinite;
  box-shadow: 0 4px 15px -3px rgba(37, 99, 235, 0.4);
}

.line-1 {
  height: 30%;
  animation-delay: 0s;
}
.line-2 {
  height: 50%;
  animation-delay: 0.1s;
}
.line-3 {
  height: 70%;
  animation-delay: 0.2s;
}
.line-4 {
  height: 50%;
  animation-delay: 0.3s;
}
.line-5 {
  height: 40%;
  animation-delay: 0.4s;
}

/* Animations */
@keyframes wave {
  0%,
  100% {
    transform: scaleY(1);
    opacity: 0.7;
  }
  50% {
    transform: scaleY(1.6);
    opacity: 1;
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .total-tokens-card {
    min-width: 280px;
    padding: 0.875rem;
    border-radius: 20px;
  }

  .total-tokens-card:hover {
    transform: translateY(-3px);
  }

  .decorative-circle-top {
    width: 6rem;
    height: 6rem;
    transform: translateY(-2rem) translateX(3rem);
  }

  .decorative-circle-bottom {
    width: 4rem;
    height: 4rem;
    transform: translateY(2rem) translateX(-2rem);
  }

  .title {
    font-size: 1rem;
  }

  .value {
    font-size: 1.5rem;
    line-height: 2rem;
  }

  .stats-grid {
    gap: 0.25rem;
  }

  .stat-item {
    padding: 0.375rem;
  }

  .stat-label {
    font-size: 0.625rem;
  }

  .stat-value {
    font-size: 0.875rem;
  }

  .loading-state {
    min-height: 150px;
  }

  .chart-lines-loader {
    height: 80px;
    gap: 8px;
  }

  .line {
    width: 6px;
  }
}

@media (max-width: 480px) {
  .total-tokens-card {
    min-width: 100%;
    padding: 0.75rem;
    border-radius: 16px;
  }

  .header-title {
    margin-bottom: 0.75rem;
  }

  .value {
    font-size: 1.25rem;
    line-height: 1.75rem;
  }

  .stats-section {
    padding-top: 0.5rem;
  }

  .stats-grid {
    grid-template-columns: 1fr;
    gap: 0.375rem;
  }

  .stat-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: left;
    padding: 0.375rem 0.75rem;
  }

  .stat-label {
    margin-bottom: 0;
  }

  .loading-state {
    min-height: 120px;
  }

  .chart-lines-loader {
    height: 60px;
    margin-bottom: 16px;
  }
}
</style>
