import type { Meta, StoryObj } from '@storybook/vue3'
import FooterExport from './FooterExport.vue'

const meta: Meta<typeof FooterExport> = {
  title: 'Charts/Utils/FooterExport',
  component: FooterExport,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
A reusable export footer component for chart cards.

## Features
- Configurable export formats (PDF, CSV, XLSX)
- Emits \`export\` event with the selected format
- Responsive design (icons only on mobile)
- Supports dark/light themes via CSS variables

## Usage
\`\`\`vue
<FooterExport 
  :formats="['pdf', 'csv', 'xlsx']" 
  @export="handleExport" 
/>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    formats: {
      control: 'check',
      options: ['pdf', 'csv', 'xlsx'],
      description: 'Array of export formats to display',
      table: {
        type: { summary: "('pdf' | 'csv' | 'xlsx')[]" },
        defaultValue: { summary: "['pdf', 'csv', 'xlsx']" },
      },
    },
    export: {
      action: 'export',
      description: 'Emitted when an export button is clicked',
      table: {
        type: { summary: "(format: 'pdf' | 'csv' | 'xlsx') => void" },
      },
    },
  },
  decorators: [
    () => ({
      template: `
        <div style="
          background: var(--kiut-bg-card-gradient, linear-gradient(to bottom, #ffffff 0%, #fafafa 100%));
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05), 0 10px 15px -3px rgba(0, 0, 0, 0.08);
        ">
          <div style="
            height: 200px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--kiut-text-secondary, #64748b);
            font-family: 'DM Sans', sans-serif;
            font-size: 14px;
            border: 2px dashed var(--kiut-border-color, rgba(93, 75, 147, 0.1));
            border-radius: 12px;
            margin-bottom: 0;
          ">
            Chart Content Area
          </div>
          <story />
        </div>
      `,
    }),
  ],
}

export default meta
type Story = StoryObj<typeof FooterExport>

/**
 * Default configuration showing all export formats
 */
export const Default: Story = {
  args: {
    formats: ['pdf', 'csv', 'xlsx'],
  },
}

/**
 * Only PDF and CSV formats
 */
export const PdfAndCsv: Story = {
  args: {
    formats: ['pdf', 'csv'],
  },
}

/**
 * Only CSV format
 */
export const CsvOnly: Story = {
  args: {
    formats: ['csv'],
  },
}

/**
 * Only XLSX format
 */
export const XlsxOnly: Story = {
  args: {
    formats: ['xlsx'],
  },
}

/**
 * PDF and XLSX formats (no CSV)
 */
export const PdfAndXlsx: Story = {
  args: {
    formats: ['pdf', 'xlsx'],
  },
}

