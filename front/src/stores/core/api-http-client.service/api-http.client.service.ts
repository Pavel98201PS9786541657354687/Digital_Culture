import { baseUrl } from "@/stores/api";

import { createHttpService } from "../http.service";

// import type { ApiDataError } from './error';
// import { formatApiError } from './utils';

/**
 * Допилить обработчик ошибок.
 * Бэку необходимо привести error response к формату который мы согласовали
 * В ответе массив строк errors
 */

/**
 * Создаем экземпляр httpService
 */
const httpService = createHttpService();

/**
 *
 *@description Инициализация apiHttpClient, выполнять в точке входа в приложение (app.tsx)
 */
export const initApiHttpClient = () => {
  // const apiHttpClient =
  httpService.init({
    // Написать configService, аккумулировать подобные данные в нем
    baseURL: baseUrl,
  });

  // apiHttpClient.initErrorFormatter<ApiDataError>(formatApiError);
};

/**
 * @description Http service для взаимодействия с основным api
 * */
export const apiHttpClient = httpService;
