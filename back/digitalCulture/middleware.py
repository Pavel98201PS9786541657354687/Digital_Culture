# digitalCulture/middleware.py

from django.utils.deprecation import MiddlewareMixin
from django.http import JsonResponse

class JsonResponseMiddleware(MiddlewareMixin):
    def process_response(self, request, response):
        # Проверяем, что ответ не является JSON и не является ошибкой
        if not isinstance(response, JsonResponse) and response['Content-Type'] == 'text/html':
            # Устанавливаем новый Content-Type
            response['Content-Type'] = 'application/json'
            # Преобразуем текстовый ответ в JSON
            response.content = JsonResponse({'message': response.content.decode('utf-8')}).content
        return response