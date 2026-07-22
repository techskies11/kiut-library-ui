export type KiutTranslationCountBadgeVariant =
  | 'configured'
  | 'autoconfigured'
  | 'neutral';

export interface KiutTranslationCountBadgeItem {
  id: string;
  label: string;
  note?: string;
}
