export type FloatTone = "danger" | "warning" | "success" | "info";

export type FloatIcon = "warning" | "error" | "chat" | "check" | "clock";

export interface FloatItem {
  id: string;
  tone: FloatTone;
  icon: FloatIcon;
  title: string;
  subtitle: string;
  /** Route the action button should open. */
  to: string;
  actionLabel?: string;
}
