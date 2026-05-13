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
- Configurable export formats (PDF, CSV)
- Loading state with animated spinner
- Emits \`export\` event with the selected format
- Responsive design (icons only on mobile)
- Supports dark/light themes via CSS variables

## Variants
- \`footer\` (default): bloque inferior con divisor y etiqueta «Export».
- \`inline\`: solo botones, para la cabecera (\`ChartMetricContainer\` slot \`headerExport\`).

## Usage
\`\`\`vue
<FooterExport 
  :formats="['pdf', 'csv']"
  :loading="isExporting"
  variant="footer"
  @export="handleExport" 
/>
\`\`\`

## Loading State
Pass a boolean to show the loading spinner on all buttons:
\`\`\`vue
<script setup>
const isExporting = ref(false)

const handleExport = async (format) => {
  isExporting.value = true
  await downloadFile(format)
  isExporting.value = false
}
</script>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    formats: {
      control: 'check',
      options: ['pdf', 'csv'],
      description: 'Array of export formats to display',
      table: {
        type: { summary: "('pdf' | 'csv')[]" },
        defaultValue: { summary: "['pdf', 'csv']" },
      },
    },
    loading: {
      control: 'boolean',
      description: 'Loading state (shows spinner on all buttons)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    variant: {
      control: 'select',
      options: ['footer', 'inline'],
      description: 'footer: bloque con divisor; inline: solo botones (cabecera)',
      table: {
        type: { summary: "'footer' | 'inline'" },
        defaultValue: { summary: "'footer'" },
      },
    },
    onExport: {
      action: 'export',
      description: 'Emitted when an export button is clicked',
      table: {
        type: { summary: "(format: 'pdf' | 'csv') => void" },
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
    formats: ['pdf', 'csv'],
    loading: false,
    variant: 'footer',
  },
}

/**
 * Cabecera: sin divisor ni etiqueta (usar con slot `headerExport` en ChartMetricContainer)
 */
export const Inline: Story = {
  args: {
    formats: ['pdf', 'csv'],
    loading: false,
    variant: 'inline',
  },
  decorators: [
    () => ({
      template: `
        <div style="
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 16px;
          border-radius: 12px;
          border: 1px solid var(--kiut-border-light, rgba(0,0,0,0.08));
          background: var(--kiut-bg-card, #fff);
        ">
          <div style="flex: 1; min-width: 0;">
            <div style="font-weight: 600; font-size: 1.125rem; font-family: Inter, sans-serif;">Título</div>
            <div style="font-size: 0.875rem; color: var(--kiut-text-secondary, #737373);">Subtítulo</div>
          </div>
          <story />
        </div>
      `,
    }),
  ],
}

/**
 * Loading state - spinner on all buttons
 */
export const Loading: Story = {
  args: {
    formats: ['pdf', 'csv'],
    loading: true,
  },
}

/**
 * Only PDF format
 */
export const PdfOnly: Story = {
  args: {
    formats: ['pdf'],
    loading: false,
  },
}

/**
 * Only CSV format
 */
export const CsvOnly: Story = {
  args: {
    formats: ['csv'],
    loading: false,
  },
}
