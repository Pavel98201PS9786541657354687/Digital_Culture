import { apiHttpClient, NotificationServiceModel } from "@/shared";

const apiPrefix = "api/front/";

export const appSources = {
  getList: (
    params: Partial<NotificationServiceModel.NotificationsRequestParams>,
  ) => {
    return apiHttpClient.get<NotificationServiceModel.NotificationsListResponse>(
      apiPrefix + `notifications`,
      {
        params,
      },
    );
  },
  updateItem: (
    id: string,
    data: NotificationServiceModel.NotificationUpdateItem,
  ) => {
    return apiHttpClient.patch(apiPrefix + `notifications/${id}`, data);
  },
  multiUpdate: (
    ids: string[],
    data: NotificationServiceModel.NotificationUpdateItem,
  ) => {
    return apiHttpClient.patch(apiPrefix + `notifications/multi`, {
      notificationId: ids,
      ...data,
    });
  },
  sendEmail: (notificationId: string) =>
    apiHttpClient.post(apiPrefix + `notifications/forwardEmail`, {
      notificationId,
    }),
};

export type AppSources = typeof appSources;
