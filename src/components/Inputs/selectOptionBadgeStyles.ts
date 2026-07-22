export type KiutSelectOptionBadgeVariant =
  | 'configured'
  | 'autoconfigured'
  | 'neutral';

export interface KiutSelectOptionBadge {
  label: string;
  variant?: KiutSelectOptionBadgeVariant;
}

const badgeBaseClass =
  'kiut-select-option-badge shrink-0 whitespace-nowrap rounded-md px-2 py-0.5 text-[0.6875rem] font-medium leading-4';

export function getSelectOptionBadgeClass(
  variant: KiutSelectOptionBadgeVariant = 'neutral'
): string {
  return `${badgeBaseClass} kiut-select-option-badge--${variant}`;
}
