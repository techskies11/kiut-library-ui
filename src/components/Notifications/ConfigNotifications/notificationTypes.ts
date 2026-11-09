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
  /** Whether the person tied to the event also receives the notice. */
  userLinked: boolean;
  /** Only editable rows can toggle `userLinked`. */
  userLinkedEditable: boolean;
}
