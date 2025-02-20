import type {
  AxiosError,
  AxiosInstance,
  AxiosPromise,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import axios from "axios";
import qs from "query-string";

import { DataError } from "./data-error";

type ErrorHandler = (error: HttpServiceError<unknown, unknown>) => unknown;
type ErrorFormatter<
  CurrentDataError extends DataError<Record<string, unknown>>,
  //  eslint-disable-next-line
> = (error: HttpServiceError<any, any>) => CurrentDataError;

export interface HttpService extends AxiosInstance {
  init: (config: HttpServiceInitConfig) => HttpService;
  subscribeOnError(func: ErrorHandler): void;
  initErrorFormatter<
    CurrentDataError extends DataError<Record<string, unknown>>,
  >(
    func: ErrorFormatter<CurrentDataError>,
  ): void;
}

export type HttpServiceError<T, D> = AxiosError<T, D>;

export type HttpServiceResponse<T, D = T> = AxiosResponse<T, D>;

export type HttpServicePromise<T> = AxiosPromise<T>;

type HttpServiceConfig = AxiosRequestConfig;

type HttpServiceInitConfig = Pick<HttpServiceConfig, "baseURL">;

export const createHttpService = (
  config: HttpServiceConfig = {},
): HttpService => {
  const errorListeners: ErrorHandler[] = [];
  let errorFormatter: ErrorFormatter<DataError<Record<string, unknown>>> = () =>
    new DataError({
      errors: [{ message: "Неизвестная ошибка", additionalInfo: {} }],
    });

  const httpService = axios.create({
    timeout: 30000,
    paramsSerializer: {
      serialize: (params) => {
        return qs.stringify(params);
      },
    },
    ...config,
  }) as HttpService;

  httpService.subscribeOnError = (func) => {
    errorListeners.push(func);
  };

  httpService.initErrorFormatter = (func) => {
    errorFormatter = func;
  };

  httpService.init = (newConfig?: HttpServiceInitConfig) => {
    if (newConfig) {
      httpService.defaults.baseURL = newConfig.baseURL;
    }

    return httpService;
  };

  return httpService;
};
