import { WidgetType } from "../../views";

export namespace NotificationServiceModel {
  export type Notification = {
    notificationId: string;
    created: string;
    isRead: boolean;
    isImportant: boolean;
    service: {
      serviceId: string;
      serviceName: string;
    };
    object: {
      objectId: string;
      objectName: string;
      objectDescription: string;
      objectLink: string;
      objectStatus: string;
      objectParent: {
        objectParentId: string;
        objectParentName: string;
        objectParentDescription: string;
      };
    };
    customer: {
      customerName: string;
      customerInn: string;
    };
    workService: {
      workServiceCode: string;
      workServiceName: string;
      workServiceType: string;
    };
    title: string;
    description: string;
    taskId: string;
  };

  export type NotificationsRequestParams = {
    isRead?: boolean;
    isImportant?: boolean;
    pageLength?: number;
    pageNumber?: number;
    dateFrom?: Date;
    dateTo?: Date;
    serviceId?: string;
    widgets?: WidgetType[];
  };

  export type NotificationUpdateItem = {
    isRead?: boolean;
    isImportant?: boolean;
  };

  export type NotificationUpdateItem = {
    isRead: boolean;
    isImportant: boolean;
  };

  export type NotificationsListResponse = {
    notifications: Notification[];
  };
}
