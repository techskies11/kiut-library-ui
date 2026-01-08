import type { Meta, StoryObj } from '@storybook/vue3';
import SankeyChart from './SankeyChart.vue';

const meta: Meta<typeof SankeyChart> = {
  title: 'Charts/Sankey',
  component: SankeyChart,
  tags: ['autodocs'],
  argTypes: {
    useGradient: {
      control: 'boolean',
      description: 'Use gradient for link colors',
      defaultValue: true,
    },
    nodeGap: {
      control: 'number',
      description: 'Gap between nodes',
      defaultValue: 20,
    },
    height: {
      control: 'text',
      description: 'Chart height',
      defaultValue: '500px',
    },
  },
};

export default meta;
type Story = StoryObj<typeof SankeyChart>;

// Data: Customer journey flow
const customerJourneyData = {
  nodes: [
    { name: 'Website Visit' },
    { name: 'Product Page' },
    { name: 'Cart' },
    { name: 'Checkout' },
    { name: 'Purchase' },
    { name: 'Exit' },
  ],
  links: [
    { source: 'Website Visit', target: 'Product Page', value: 1000 },
    { source: 'Website Visit', target: 'Exit', value: 300 },
    { source: 'Product Page', target: 'Cart', value: 600 },
    { source: 'Product Page', target: 'Exit', value: 400 },
    { source: 'Cart', target: 'Checkout', value: 400 },
    { source: 'Cart', target: 'Exit', value: 200 },
    { source: 'Checkout', target: 'Purchase', value: 300 },
    { source: 'Checkout', target: 'Exit', value: 100 },
  ],
};

// Data: Energy flow
const energyFlowData = {
  nodes: [
    { name: 'Coal' },
    { name: 'Gas' },
    { name: 'Solar' },
    { name: 'Wind' },
    { name: 'Electricity' },
    { name: 'Residential' },
    { name: 'Industrial' },
    { name: 'Commercial' },
  ],
  links: [
    { source: 'Coal', target: 'Electricity', value: 450 },
    { source: 'Gas', target: 'Electricity', value: 380 },
    { source: 'Solar', target: 'Electricity', value: 220 },
    { source: 'Wind', target: 'Electricity', value: 280 },
    { source: 'Electricity', target: 'Residential', value: 480 },
    { source: 'Electricity', target: 'Industrial', value: 520 },
    { source: 'Electricity', target: 'Commercial', value: 330 },
  ],
};

// Data: User flow through app
const userFlowData = {
  nodes: [
    { name: 'Landing' },
    { name: 'Sign Up' },
    { name: 'Login' },
    { name: 'Dashboard' },
    { name: 'Settings' },
    { name: 'Profile' },
    { name: 'Logout' },
  ],
  links: [
    { source: 'Landing', target: 'Sign Up', value: 500 },
    { source: 'Landing', target: 'Login', value: 800 },
    { source: 'Sign Up', target: 'Dashboard', value: 450 },
    { source: 'Login', target: 'Dashboard', value: 750 },
    { source: 'Dashboard', target: 'Settings', value: 300 },
    { source: 'Dashboard', target: 'Profile', value: 400 },
    { source: 'Dashboard', target: 'Logout', value: 500 },
    { source: 'Settings', target: 'Logout', value: 250 },
    { source: 'Profile', target: 'Logout', value: 350 },
  ],
};

// Data: Sales funnel
const salesFunnelData = {
  nodes: [
    { name: 'Leads' },
    { name: 'Qualified' },
    { name: 'Proposal' },
    { name: 'Negotiation' },
    { name: 'Closed Won' },
    { name: 'Lost' },
  ],
  links: [
    { source: 'Leads', target: 'Qualified', value: 850 },
    { source: 'Leads', target: 'Lost', value: 150 },
    { source: 'Qualified', target: 'Proposal', value: 650 },
    { source: 'Qualified', target: 'Lost', value: 200 },
    { source: 'Proposal', target: 'Negotiation', value: 500 },
    { source: 'Proposal', target: 'Lost', value: 150 },
    { source: 'Negotiation', target: 'Closed Won', value: 400 },
    { source: 'Negotiation', target: 'Lost', value: 100 },
  ],
};

// Data: Traffic sources
const trafficSourcesData = {
  nodes: [
    { name: 'Organic' },
    { name: 'Direct' },
    { name: 'Social' },
    { name: 'Paid' },
    { name: 'Desktop' },
    { name: 'Mobile' },
    { name: 'Tablet' },
    { name: 'Conversion' },
    { name: 'Bounce' },
  ],
  links: [
    { source: 'Organic', target: 'Desktop', value: 400 },
    { source: 'Organic', target: 'Mobile', value: 600 },
    { source: 'Direct', target: 'Desktop', value: 300 },
    { source: 'Direct', target: 'Mobile', value: 200 },
    { source: 'Social', target: 'Mobile', value: 450 },
    { source: 'Social', target: 'Tablet', value: 50 },
    { source: 'Paid', target: 'Desktop', value: 200 },
    { source: 'Paid', target: 'Mobile', value: 300 },
    { source: 'Desktop', target: 'Conversion', value: 300 },
    { source: 'Desktop', target: 'Bounce', value: 600 },
    { source: 'Mobile', target: 'Conversion', value: 400 },
    { source: 'Mobile', target: 'Bounce', value: 1150 },
    { source: 'Tablet', target: 'Conversion', value: 20 },
    { source: 'Tablet', target: 'Bounce', value: 30 },
  ],
};

// Data: Simple flow
const simpleFlowData = {
  nodes: [
    { name: 'A' },
    { name: 'B' },
    { name: 'C' },
    { name: 'D' },
  ],
  links: [
    { source: 'A', target: 'B', value: 100 },
    { source: 'A', target: 'C', value: 80 },
    { source: 'B', target: 'D', value: 70 },
    { source: 'C', target: 'D', value: 60 },
  ],
};

// Custom colors for nodes
const customColors = {
  'Website Visit': '#C67DFF',
  'Product Page': '#8b5cf6',
  'Cart': '#a855f7',
  'Checkout': '#7c3aed',
  'Purchase': '#5d4b93',
  'Exit': '#cbd5e1',
};

// Story: Default - Customer journey
export const Default: Story = {
  args: {
    data: customerJourneyData,
    title: 'Customer Journey Flow',
    height: '500px',
    useGradient: true,
    nodeGap: 20,
  },
};

// Story: Energy flow
export const EnergyFlow: Story = {
  args: {
    data: energyFlowData,
    title: 'Energy Distribution',
    height: '500px',
    useGradient: true,
    nodeGap: 20,
  },
};

// Story: User flow
export const UserFlow: Story = {
  args: {
    data: userFlowData,
    title: 'User Flow Through App',
    height: '500px',
    useGradient: true,
    nodeGap: 20,
  },
};

// Story: Sales funnel
export const SalesFunnel: Story = {
  args: {
    data: salesFunnelData,
    title: 'Sales Funnel',
    height: '500px',
    useGradient: true,
    nodeGap: 20,
  },
};

// Story: Traffic sources
export const TrafficSources: Story = {
  args: {
    data: trafficSourcesData,
    title: 'Traffic Sources & Conversions',
    height: '600px',
    useGradient: true,
    nodeGap: 18,
  },
};

// Story: Simple flow
export const Simple: Story = {
  args: {
    data: simpleFlowData,
    title: 'Simple Flow',
    height: '400px',
    useGradient: true,
    nodeGap: 30,
  },
};

// Story: With custom colors
export const CustomColors: Story = {
  args: {
    data: customerJourneyData,
    title: 'Customer Journey with Custom Colors',
    height: '500px',
    nodeColors: customColors,
    useGradient: true,
    nodeGap: 20,
  },
};

// Story: Without gradient
export const WithoutGradient: Story = {
  args: {
    data: energyFlowData,
    title: 'Energy Distribution (No Gradient)',
    height: '500px',
    useGradient: false,
    nodeGap: 20,
  },
};

// Story: Compact nodes
export const CompactNodes: Story = {
  args: {
    data: userFlowData,
    title: 'User Flow (Compact)',
    height: '500px',
    useGradient: true,
    nodeGap: 10,
  },
};

// Story: Spacious layout
export const SpaciousLayout: Story = {
  args: {
    data: simpleFlowData,
    title: 'Simple Flow (Spacious)',
    height: '500px',
    useGradient: true,
    nodeGap: 40,
  },
};







