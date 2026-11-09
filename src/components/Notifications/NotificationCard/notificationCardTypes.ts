export type NotificationTone = "message" | "pending" | "alert";
export type NotificationType = "notification" | "notificationList";
 
export interface InboxNotification {
  id: string;
  tone: NotificationTone;
  title: string;
  body: string;
  time: string;
  unread: boolean;
  type: NotificationType;
}
