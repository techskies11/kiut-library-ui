<template>
  <ChannelMetrics
    v-if="props.breakdownBy === 'channel'"
    :data="channelData"
    :loading="props.loading"
    :title="chartTitle"
    :subtitle="props.subtitle"
    :breakdown-by="props.breakdownBy"
    :breakdown-options="props.breakdownOptions"
    unit="convs"
    :total-conversations="totalConversations"
    :empty-title="props.emptyTitle"
    :empty-description="props.emptyDescription"
    @change-breakdown="emit('changeBreakdown', $event)"
  />
  <MessagesPerAgent
    v-else
    :data="agentData"
    :loading="props.loading"
    :title="chartTitle"
    :subtitle="props.subtitle"
    :breakdown-by="props.breakdownBy"
    :breakdown-options="props.breakdownOptions"
    unit="convs"
    :total-conversations="totalConversations"
    :max-series="props.breakdownBy === 'agent_channel' ? 7 : undefined"
    :show-summary-cards="props.breakdownBy !== 'all'"
    :empty-title="props.emptyTitle"
    :empty-description="props.emptyDescription"
    @change-breakdown="emit('changeBreakdown', $event)"
  />
</template>

<script setup lang="ts">
import { computed } from "vue";

import ChannelMetrics from "../ChannelMetrics/ChannelMetrics.vue";
import MessagesPerAgent from "../MessagesPerAgent/MessagesPerAgent.vue";

interface BreakdownOption {
  value: string;
  label: string;
}

interface ConversationVolumeBreakdownItem {
  key: string;
  total_conversations: number;
}

interface ConversationVolumeData {
  total_conversations: number;
  breakdown_by_day: Record<string, Record<string, number>>;
  breakdown_items: ConversationVolumeBreakdownItem[];
}

interface ConversationVolumeTitles {
  all: string;
  resolution_mode: string;
  agent: string;
  channel: string;
  agent_channel: string;
}

const props = withDefaults(
  defineProps<{
    data?: ConversationVolumeData | null;
    loading?: boolean;
    breakdownBy?: keyof ConversationVolumeTitles;
    breakdownOptions?: BreakdownOption[];
    titles?: ConversationVolumeTitles;
    subtitle?: string;
    emptyTitle?: string;
    emptyDescription?: string;
  }>(),
  {
    data: null,
    loading: false,
    breakdownBy: "all",
    breakdownOptions: () => [],
    titles: () => ({
      all: "Conversations",
      resolution_mode: "Conversations by Resolution Mode",
      agent: "Conversations by Agent",
      channel: "Conversations by Channel",
      agent_channel: "Conversations by Agent and Channel",
    }),
    subtitle: "Conversations over time",
    emptyTitle: "No conversation data",
    emptyDescription: "Try adjusting the date range or filters.",
  },
);

const emit = defineEmits<{
  changeBreakdown: [value: string];
}>();

const totalConversations = computed(() => props.data?.total_conversations ?? 0);
const breakdownByDay = computed(() => props.data?.breakdown_by_day ?? {});
const chartTitle = computed(() => props.titles[props.breakdownBy]);
const agentData = computed(() => ({ agents_by_day: breakdownByDay.value }));
const channelData = computed(() => ({
  channels_by_day: breakdownByDay.value,
  total_by_channel: Object.fromEntries(
    (props.data?.breakdown_items ?? []).map((item) => [item.key, item.total_conversations]),
  ),
  total_conversations: totalConversations.value,
}));
</script>
