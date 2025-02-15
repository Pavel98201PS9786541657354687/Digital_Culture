import { createHttpService } from "../http.service";

/**
 * Создаем экземпляр httpService
 */
const httpService = createHttpService();

/**
 *
 *@description Инициализация apiHttpClient, выполнять в точке входа в приложение (app.tsx)
 */
export const initApiHttpClient = () => {
  httpService.init({
    // baseURL: baseUrl,
  });
};

/**
 * @description Http service для взаимодействия с основным api
 * */
export const apiHttpClient = httpService;
