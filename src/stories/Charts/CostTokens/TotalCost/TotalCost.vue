<template>
  <article
    class="total-cost-card glass"
  >
    <!-- Elemento decorativo de fondo -->
    <div
      class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-violet-500/10 rounded-full -translate-y-16 translate-x-16"
    ></div>
    <div
      class="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-500/10 to-violet-500/10 rounded-full translate-y-12 -translate-x-12"
    ></div>

      <header class="flex justify-between items-center mb-6 relative z-10">
        <div class="flex items-center gap-2">
          <span class="font-display font-bold text-3xl text-slate-800 tracking-tight">Total Cost</span>
        </div>
      </header>
  
      <template v-if="!currentLoading">
        <div class="flex flex-col items-center justify-center relative z-10 py-4 mb-4">
          <div
            class="text-7xl font-display font-bold text-violet-600 tracking-tighter"
          >
            {{ formattedTotalCost }}
          </div>
        </div>
  
        <div class="pt-4 relative z-10">
          <div class="grid grid-cols-2 gap-6">
            <div class="stats-badge">
              <div class="badge-label">
                Daily Average
              </div>
              <div class="badge-value">{{ formattedDailyMean }}</div>
            </div>
            <div class="stats-badge">
              <div class="badge-label">
                Peak Day
              </div>
              <div class="badge-value-container">
                <div class="badge-date">{{ peakDayDate }}</div>
                <div class="badge-value">{{ peakDayValue }}</div>
              </div>
            </div>
          </div>
        </div>
      </template>

    <div class="flex justify-center items-center py-12 relative z-10" v-else>
      <Skeleton width="100%" height="120px" />
    </div>
  </article>
</template>

<script setup>
  import { ref, onMounted, watch, computed } from 'vue'
  // Mock de servicios ya que no se encuentran en el proyecto o están en rutas distintas
  const getCostUsage = async () => ({ total_cost: 0, costs_by_day: {} })
  const getConversationCount = async () => ({ total_conversations: 0 })
  
  // Mock del componente Skeleton (ya que primevue no está instalado)
  const Skeleton = { 
    props: ['width', 'height'],
    template: '<div class="animate-pulse bg-purple-100/50 dark:bg-purple-900/20 rounded-xl" :style="{ width, height }"></div>' 
  }
  
  import moment from 'moment'
  import { useCurrencyFormat } from '../../../../plugins/numberFormat'

  const props = defineProps({
    dates: {
      type: Array,
      required: true,
    },
    airline_name: {
      type: String,
      required: true,
    },
    costUsage: {
      type: Object,
      default: null,
    },
    conversationCount: {
      type: Object,
      default: null,
    },
    loading: {
      type: Boolean,
      default: false,
    }
  })

  const internalCostUsage = ref({})
  const internalConversationCount = ref({})
  const internalLoading = ref(true)

  const currentCostUsage = computed(() => props.costUsage || internalCostUsage.value)
  const currentConversationCount = computed(() => props.conversationCount || internalConversationCount.value)
  const currentLoading = computed(() => props.costUsage !== null ? props.loading : internalLoading.value)

  const totalCost = computed(() => {
    if (!currentCostUsage.value?.total_cost) return 0
    return currentCostUsage.value.total_cost
  })

  const dailyMean = computed(() => {
    if (!currentCostUsage.value?.costs_by_day) return 0
    const values = Object.values(currentCostUsage.value.costs_by_day).map(
      dayData => dayData.total_cost || 0
    )
    if (values.length === 0) return 0
    const sum = values.reduce((accumulator, value) => accumulator + value, 0)
    return sum / values.length
  })

    const formattedTotalCost = computed(() => useCurrencyFormat(totalCost.value))
    const formattedDailyMean = computed(() => useCurrencyFormat(dailyMean.value))

    const peakEntry = computed(() => {
      if (!currentCostUsage.value?.costs_by_day) return null
      const entries = Object.entries(currentCostUsage.value.costs_by_day)
      if (entries.length === 0) return null
      return entries.reduce((max, current) => {
        const currentTotal = current[1].total_cost || 0
        const maxTotal = max[1].total_cost || 0
        return currentTotal > maxTotal ? current : max
      })
    })

    const peakDayDate = computed(() => {
      if (!peakEntry.value) return '-'
      return moment(peakEntry.value[0]).format('MMMM D, YYYY')
    })

    const peakDayValue = computed(() => {
      if (!peakEntry.value) return '-'
      return useCurrencyFormat(peakEntry.value[1].total_cost || 0)
    })

    const searchData = async () => {
    if (props.costUsage !== null) return
    try {
      internalLoading.value = true
      const startDate = moment(props.dates[0]).format('YYYY-MM-DD')
      const endDate = moment(props.dates[1]).format('YYYY-MM-DD')
      const [cost, conv] = await Promise.all([
        getCostUsage(props.airline_name, startDate, endDate),
        getConversationCount(props.airline_name, startDate, endDate),
      ])
      internalCostUsage.value = cost
      internalConversationCount.value = conv
    } catch (error) {
      console.error(error)
    } finally {
      internalLoading.value = false
    }
  }

  onMounted(async () => searchData())
  watch(
    () => props.dates,
    async () => props.dates[0] && props.dates[1] && searchData()
  )
</script>

  <style scoped>
    .total-cost-card {
      font-family: 'DM Sans', sans-serif;
      background: #f8faff;
      border-radius: 28px;
      padding: 32px 40px;
      border: 1px solid rgba(0, 0, 0, 0.04);
      box-shadow: 0 12px 40px -12px rgba(0, 0, 0, 0.08);
      position: relative;
      overflow: hidden;
      transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      min-width: 440px;
    }

    .total-cost-card:hover {
      transform: translateY(-6px);
      box-shadow: 0 20px 50px -15px rgba(0, 0, 0, 0.12);
    }

    .glass {
      background: rgba(255, 255, 255, 0.85);
      backdrop-filter: blur(10px);
    }

    :host-context(.dark) .total-cost-card,
    .dark .total-cost-card {
      background: #0c0c0e;
      border-color: rgba(255, 255, 255, 0.04);
    }

    :host-context(.dark) .glass,
    .dark .glass {
      background: rgba(18, 18, 20, 0.85);
    }

    .font-display {
      font-family: 'Space Grotesk', sans-serif;
    }

    .stats-badge {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 28px 20px;
      background: #ffffff;
      border-radius: 24px;
      box-shadow: 0 4px 12px -2px rgba(0, 0, 0, 0.01);
      transition: all 0.3s ease;
      border: 1px solid rgba(0, 0, 0, 0.01);
    }

    .dark .stats-badge {
      background: #161619;
      border-color: rgba(255, 255, 255, 0.03);
    }

    .stats-badge:hover {
      transform: scale(1.03);
      box-shadow: 0 12px 25px -5px rgba(0, 0, 0, 0.06);
    }

    .badge-label {
      color: #94a3b8;
      font-size: 0.9rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      margin-bottom: 16px;
    }

    .badge-value {
      font-family: 'Space Grotesk', sans-serif;
      font-weight: 700;
      font-size: 2rem;
      color: #1e293b;
      line-height: 1.1;
      letter-spacing: -0.02em;
    }

    .dark .badge-value, .dark .badge-date {
      color: #f1f5f9;
    }

    .badge-value-container {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .badge-date {
      font-family: 'Space Grotesk', sans-serif;
      font-weight: 700;
      font-size: 1.3rem;
      color: #334155;
      letter-spacing: -0.01em;
    }

    .text-violet-600 {
      color: #6366f1; /* Un violeta más vibrante como en la imagen */
    }

    .dark .text-violet-600 {
      color: #818cf8;
    }
    
    .tracking-tighter {
      letter-spacing: -0.05em;
    }
    
    .tracking-tight {
      letter-spacing: -0.02em;
    }
  </style>
