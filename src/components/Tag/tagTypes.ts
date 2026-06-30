export type KiutTagColor =
  | 'purple'
  | 'warning'
  | 'success'
  | 'danger'
  | 'orange'
  | 'neutral';

export type KiutTagSelectValue = string | number;

export interface KiutTagSelectOption<T extends KiutTagSelectValue = string> {
  value: T;
  label: string;
  color: KiutTagColor;
  disabled?: boolean;
}
