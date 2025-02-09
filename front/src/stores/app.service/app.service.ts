import {
  AppSources,
  appSources,
} from "./app.sources";
import { cacheService, NotificationServiceModel } from "@/stores";

class AppService {
  private serviceBaseKey = "app-service";

  constructor(
    private readonly sources: AppSources,
    private readonly cache: CacheService,
  ) {}

  getList(
    params: Partial<NotificationServiceModel.NotificationsRequestParams>,
  ) {
    return this.cache.createQuery(
      [this.serviceBaseKey, "notificationsList", params],
      () => this.sources.getList(params),
    );
  }

  async update(
    id: string,
    data: NotificationServiceModel.NotificationUpdateItem,
  ) {
    const res = await this.cache
      .createMutation((id: string) => this.sources.updateItem(id, data))
      .async(id);
    await this.cache.invalidate(["notificationsList"]);
    return res;
  }
}

export const appService = new AppService(
  appSources,
  cacheService,
);
