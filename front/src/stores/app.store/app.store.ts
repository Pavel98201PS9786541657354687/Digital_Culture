import { makeAutoObservable } from "mobx";

import { appService } from "../app.service";

class AppViewStore {
  private appService = appService;

  public language: "eng" | "ru" = "ru";

  public videoList = new Set();
  private readonly limit = 9;
  public offset = 0;
  public totalProjectCount = 0;
  public eyeVideoLoading = false;

  public switchLanguage = () => {
    if (this.language === "ru") {
      this.language = "eng";
    } else {
      this.language = "ru";
    }
  };

  public addItemsToVideoList = (data) => {
    data.forEach((item) => this.videoList.add(item));
  };

  public increaseOffset = () => {
    this.offset += this.limit;
  };

  public setTotalProjectCount = (count: number) => {
    this.totalProjectCount = count;
  };

  public setEyeVideoLoading = (loading: boolean) => {
    this.eyeVideoLoading = loading;
  };

  constructor() {
    makeAutoObservable(this);
  }

  public getListVideo() {
    return this.appService.getListVideo({
      limit: this.limit,
      offset: this.offset,
    });
  }

  public getProjectData(id: string) {
    return this.appService.getProjectData(id);
  }

  public getListBlocks() {
    return this.appService.getListBlocks({
      limit: 1000,
      offset: 0,
    });
  }

  public postApplication(data) {
    return this.appService.postApplication(data);
  }
}

export const appViewStore = new AppViewStore();
