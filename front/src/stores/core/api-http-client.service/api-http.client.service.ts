import { createHttpService } from "../http.service";
import { API_URL } from "../../../constants";

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
    baseURL: API_URL,
  });
};

/**
 * @description Http service для взаимодействия с основным api
 * */
export const apiHttpClient = httpService;
