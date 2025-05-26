import { CacheService, cacheService } from "@/stores";

import { AppSources, appSources } from "./app.sources";

class AppService {
  private serviceBaseKey = "app-service";

  constructor(
    private readonly sources: AppSources,
    private readonly cache: CacheService,
  ) {}

  getListVideo(params) {
    return this.cache.createQuery(
      [this.serviceBaseKey, "listVideo", params],
      () => this.sources.getListVideo(params),
    );
  }

  getProjectData(id: string) {
    return this.cache.createQuery([this.serviceBaseKey, id], () =>
      this.sources.getProjectData(id),
    );
  }

  getListBlocks(params) {
    return this.cache.createQuery(
      [this.serviceBaseKey, "listBlocks", params],
      () => this.sources.getListBlocks(params),
    );
  }

  getFile(path) {
    return this.cache.createQuery([this.serviceBaseKey, "file", path], () =>
      this.sources.getFile(path),
    );
  }

  async postApplication(data: any) {
    return await this.cache
      .createMutation((data) => this.sources.postApplication(data))
      .async(data);
  }
}

export const appService = new AppService(appSources, cacheService);
