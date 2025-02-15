import { makeAutoObservable } from "mobx";

import { appService } from "../app.service";

class AppViewStore {
  private appService = appService;

  public language: "eng" | "ru" = "ru";

  private readonly limit = 3;
  public offset = 0;
  public totalProjectCount = 0;

  public increaseOffset = () => {
    this.offset += this.limit;
  }

  public switchLanguage = () => {
    if (this.language === "ru") {
      this.language = "eng";
    } else {
      this.language = "ru";
    }
  };

  constructor() {
    makeAutoObservable(this);
  }

  public getListVideo() {
    // const res = this.appService.getListVideo({
    //   limit: this.limit,
    //   offset: this.offset,
    // }).async().then((response) => {
    //   this.totalProjectCount = response.data?.count ?? 0;
    //   return response;
    // });
    //
    // return res;
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
