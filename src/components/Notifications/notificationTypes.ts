export interface NotificationRole {
  id: string;
  label: string;
}

/** `editable` toggles. `locked-on` / `locked-off` stay fixed. */
export type NotificationUserLinkMode = 'editable' | 'locked-on' | 'locked-off';

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  /** Optional second line, for example the related SLA parameter. */
  hint?: string;
  roleIds: string[];
  userLinked: boolean;
  userLinkMode: NotificationUserLinkMode;
}
