import type { Component } from "vue";

export interface VerticalNavItem {
  value: string;
  label: string;
  icon?: Component;
  disabled?: boolean;
  testId?: string;
}
