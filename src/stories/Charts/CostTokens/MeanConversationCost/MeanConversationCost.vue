<template>
  <article class="mean-conversation-cost-card glass">
    <!-- Elemento decorativo de fondo -->
    <div class="decorative decorative-circle-top"></div>
    <div class="decorative decorative-circle-bottom"></div>

    <header class="header-title">
      <div class="container-title">
        <span class="title">Mean Conversation Cost</span>
      </div>
    </header>

    <template v-if="!loading">
      <div class="container-value">
        <div class="value" :class="getCostColorClass(mean)">
          {{ meanFormatted }}
        </div>
      </div>

      <div class="stats-section">
        <div class="stats-grid">
          <div class="stat-item">
            <div class="stat-label">Min (daily)</div>
            <div class="stat-value">
              {{ minFormatted }}
            </div>
          </div>
          <div class="stat-item">
            <div class="stat-label">Peak Day</div>
            <div class="stat-value">{{ peakDay }}</div>
            <div class="stat-value">{{ formattedPeakValue }}</div>
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
import { useCurrencyFormat } from "../../../../plugins/numberFormat";

const props = withDefaults(
  defineProps<{
    mean?: number;
    minDaily?: number;
    peakDay?: string;
    peakDayValue?: number;
    loading?: boolean;
  }>(),
  {
    mean: 0,
    minDaily: 0,
    peakDay: "-",
    peakDayValue: 0,
    loading: false,
  }
);

const meanFormatted = computed(() => useCurrencyFormat(props.mean));
const minFormatted = computed(() => useCurrencyFormat(props.minDaily));
const formattedPeakValue = computed(() =>
  useCurrencyFormat(props.peakDayValue)
);
const getCostColorClass = (value: number) => {
  if (value === null || value === undefined || isNaN(value))
    return "cost-neutral";
  if (value < 0.05) return "cost-low";
  if (value <= 0.12) return "cost-medium";
  return "cost-high";
};
</script>

<style scoped>
.mean-conversation-cost-card {
  font-family: "DM Sans", -apple-system, BlinkMacSystemFont, "Segoe UI",
    sans-serif;
  background: white;
  border-radius: 28px;
  border: 1px solid rgba(208, 250, 229, 0.5);
  padding: 1rem;
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 10px 40px -15px rgba(0, 0, 0, 0.12);
  display: flex;
  flex-direction: column;
  height: 100%;
}

.mean-conversation-cost-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 50px -15px rgba(0, 0, 0, 0.12);
}

.glass {
  background-image: linear-gradient(to bottom right, #ecfdf5, white, #f0fdfa);
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
  background-image: linear-gradient(
    to bottom right,
    rgba(208, 250, 229, 0.3),
    rgba(203, 251, 241, 0.3)
  );
  transform: translateY(-3rem) translateX(4rem);
}

.decorative-circle-bottom {
  bottom: 0;
  left: 0;
  width: 6rem;
  height: 6rem;
  background-image: linear-gradient(
    to top right,
    rgba(208, 250, 229, 0.2),
    rgba(203, 251, 241, 0.2)
  );
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
  font-size: 1.875rem;
  line-height: 2.25rem;
  color: transparent;
}

.cost-neutral {
  color: #9ca3af;
}

.cost-low {
  background: linear-gradient(to right, #22c55e, #10b981);
  background-clip: text;
  -webkit-background-clip: text;
}

.cost-medium {
  background: linear-gradient(to right, #facc15, #ca8a04);
  background-clip: text;
  -webkit-background-clip: text;
}

.cost-high {
  background: linear-gradient(to right, #ef4444, #b91c1c);
  background-clip: text;
  -webkit-background-clip: text;
}

.stats-section {
  padding-top: 0.75rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
  font-weight: 0.875rem;
  line-height: 1.25rem;
}

.stat-item {
  text-align: center;
  padding: 0.625rem;
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
  margin-bottom: 0.25rem;
}

.stat-value {
  font-weight: bold;
  font-size: 1rem;
  color: #1e2939;
}

.stat-date {
  font-size: 0.75rem;
  color: #101112;
  margin-bottom: 0.125rem;
  font-weight: bold;
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
  background: linear-gradient(
    to top,
    rgb(0, 212, 146) 0%,
    rgb(94, 233, 181) 50%,
    rgb(0, 213, 190) 100%
  );
  border-radius: 4px;
  animation: wave 1.5s ease-in-out infinite;
  box-shadow: 0 4px 15px -3px rgba(11, 245, 93, 0.4);
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

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .mean-conversation-cost-card {
    min-width: 280px;
    padding: 0.875rem;
    border-radius: 20px;
  }

  .mean-conversation-cost-card:hover {
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
    gap: 0.5rem;
  }

  .stat-item {
    padding: 0.5rem;
  }

  .stat-label {
    font-size: 0.625rem;
  }

  .stat-value {
    font-size: 0.875rem;
  }

  .stat-date {
    font-size: 0.75rem;
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
  .mean-conversation-cost-card {
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
    gap: 0.5rem;
  }

  .stat-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: left;
    padding: 0.5rem 0.75rem;
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
