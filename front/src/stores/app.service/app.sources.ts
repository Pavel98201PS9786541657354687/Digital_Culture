import { API_URL } from "../../constants";
import { apiHttpClient } from "../core";

const apiPrefix = `${API_URL}/api/`;

export const appSources = {
  getListVideo: (params) => {
    return apiHttpClient.get(apiPrefix + `getListVideo`, { params });
  },
  getFile: (path) => {
    return apiHttpClient.get(path);
  },
  getProjectData: (id: string) => {
    return apiHttpClient.get(apiPrefix + `projectsFiles/${id}`);
  },
  getListBlocks: (params) => {
    return apiHttpClient.get(apiPrefix + `blocks`, { params });
  },
  postApplication: (data: any) => {
    return apiHttpClient.post(apiPrefix + `postApplications`, data);
  },
};

export type AppSources = typeof appSources;
