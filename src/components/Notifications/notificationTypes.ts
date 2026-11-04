export interface NotificationRole {
  id: string;
  label: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  /** Role ids assigned as recipients. */
  roleIds: string[];
  /** Whether a user is linked to this notice. */
  userLinked: boolean;
}
