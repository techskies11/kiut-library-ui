import type { Meta, StoryObj } from "@storybook/vue3";
import CheckinErrorReasons, {
  type CheckinErrorReasonsBreakdown,
} from "./CheckinErrorReasons.vue";

const retrieveMock: CheckinErrorReasonsBreakdown = {
  stage: "on_retrieve",
  total_errors: 42,
  total_unrecovered: null,
  total_bp_not_issued: null,
  categories: [
    {
      outcome_group: null,
      category_key: "user_error",
      category_label: "User error",
      error_count: 18,
      percentage: 42.9,
      raw_logs: [
        { message: "LAST_NAME_MISMATCH", count: 12, percentage_of_total: 28.6 },
        { message: "INVALID_RECORD_LOCATOR", count: 6, percentage_of_total: 14.3 },
      ],
    },
    {
      outcome_group: null,
      category_key: "tech_error",
      category_label: "Tech error",
      error_count: 14,
      percentage: 33.3,
      raw_logs: [
        { message: "UPSTREAM_CHECKIN_ERROR", count: 10, percentage_of_total: 23.8 },
        { message: "TIMEOUT", count: 4, percentage_of_total: 9.5 },
      ],
    },
    {
      outcome_group: null,
      category_key: "business_rule",
      category_label: "Business rule",
      error_count: 10,
      percentage: 23.8,
      raw_logs: [
        { message: "CHECKIN_NOT_OPEN", count: 10, percentage_of_total: 23.8 },
      ],
    },
  ],
};

const processMock: CheckinErrorReasonsBreakdown = {
  stage: "on_check_in_process",
  total_errors: 31,
  total_unrecovered: 19,
  total_bp_not_issued: 12,
  categories: [
    {
      outcome_group: "unrecovered",
      category_key: "validation_error",
      category_label: "Validation error",
      error_count: 9,
      percentage: 29.0,
      raw_logs: [
        {
          message: "VALIDATION_ERROR: missing passenger document",
          count: 9,
          percentage_of_total: 29.0,
        },
      ],
    },
    {
      outcome_group: "unrecovered",
      category_key: "error_assigning_seats",
      category_label: "Error assigning seats",
      error_count: 10,
      percentage: 32.3,
      raw_logs: [
        {
          message: "400 Client Error: Bad Request for url: .../add_delete_seats",
          count: 10,
          percentage_of_total: 29.0,
        },
      ],
    },
    {
      outcome_group: "bp_not_issued",
      category_key: "choose_boardingpass",
      category_label: "Choose Boardingpass",
      error_count: 7,
      percentage: 22.6,
      raw_logs: [
        { message: "HTTP_ERROR: gateway timeout", count: 7, percentage_of_total: 22.6 },
      ],
    },
    {
      outcome_group: "bp_not_issued",
      category_key: "generate_boarding_pass",
      category_label: "Generate Boarding Pass",
      error_count: 5,
      percentage: 16.1,
      raw_logs: [
        { message: "BP generation failed", count: 5, percentage_of_total: 16.1 },
      ],
    },
  ],
};

const meta = {
  title: "Charts/BusinessMetrics/CheckinErrorReasons",
  component: CheckinErrorReasons,
  tags: ["autodocs"],
  argTypes: {
    stage: {
      control: "select",
      options: ["on_retrieve", "on_check_in_process"],
    },
    loading: { control: "boolean" },
    initiallyOpen: { control: "boolean" },
  },
} satisfies Meta<typeof CheckinErrorReasons>;

export default meta;
type Story = StoryObj<typeof meta>;

export const OnRetrieve: Story = {
  args: {
    initiallyOpen: true,
    stage: "on_retrieve",
    errorReasons: retrieveMock,
  },
};

export const OnCheckInProcess: Story = {
  args: {
    initiallyOpen: true,
    stage: "on_check_in_process",
    errorReasons: processMock,
  },
};

export const Loading: Story = {
  args: {
    initiallyOpen: true,
    loading: true,
    stage: "on_retrieve",
    errorReasons: null,
  },
};

export const Empty: Story = {
  args: {
    initiallyOpen: true,
    stage: "on_retrieve",
    errorReasons: {
      stage: "on_retrieve",
      total_errors: 0,
      total_unrecovered: null,
      total_bp_not_issued: null,
      categories: [],
    },
  },
};
