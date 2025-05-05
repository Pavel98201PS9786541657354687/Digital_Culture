from rest_framework.generics import *
from . import serializers
from . import models
from rest_framework.response import Response
from rest_framework import generics
from rest_framework import viewsets
from rest_framework import mixins
from rest_framework.views import APIView
from rest_framework import status
import requests
import datetime
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.renderers import TemplateHTMLRenderer
from rest_framework.viewsets import ReadOnlyModelViewSet
import traceback
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from django.views.decorators.vary import vary_on_cookie, vary_on_headers

# Метод для вывода видео файлов
class getVideoListAPIView(generics.ListAPIView):
    queryset = models.moviesModel.objects.all()
    serializer_class = serializers.getVideoSerializer
    
    @method_decorator(cache_page(60 * 60 * 2))
    @method_decorator(vary_on_cookie)
    def list(self, request, *args, **kwargs):
        # Получаем стандартный ответ от родительского класса
        response = super().list(request, *args, **kwargs)

        # Устанавливаем Content-Type в application/json
        response['Content-Type'] = 'application/json'
        
        return response

def send_applications(message="Тест"):
    try:
        TOKEN = "8150611420:AAGfXh_lR78aCQavsrdjFU4814_gDQvDG_M"
        chat_id = "-4725460993"
        message_text = message
        send_message_url = f'https://api.telegram.org/bot{TOKEN}/sendMessage'
    
        payload = {
            'chat_id': chat_id,
            'text': message_text
        }
    
        response = requests.post(send_message_url, data=payload) 
        return 200   
    except:
        return str(traceback.format_exc())


# Метод для отправки заявки
class applicationsPostCreateListAPIView(generics.ListCreateAPIView):
    serializer_class = serializers.applicationsPostSerializer
    queryset = models.applications.objects.all()

    def create(self, request, *args, **kwargs):
        try:
            data = request.data
            # Формируем сообщение
            print(str(data))
            message = str(f"Новая заявка от {data['initials']}.\nКомпания: {data['company']}\nСфера деятельности: {data['sphere_activity']}\nСоц. сети организации: {data['url_links']}\nТелефон для связи: {data['phone_number']}.\nОписание: {data['comments']}")
            
            serializer = self.get_serializer(data=data)
            serializer.is_valid(raise_exception=True)
            serializer.save() 
            
            result_send_message = send_applications(message)
            if result_send_message == 200:
                response_data = {"ответ": "Заявка отправлена", "status": 200}
                return self._custom_response(response_data)
            else:
                response_data = {"ответ": "Возникла ошибка отправки заявки", "Подробнее": result_send_message, "status": 400}
                return self._custom_response(response_data)
        except Exception as e:
            response_data = {"ответ": "Ошибка", "Подробнее": str(e), "Ошибка от django": str(traceback.format_exc())}
            return self._custom_response(response_data)

    def _custom_response(self, data):
        response = Response(data)
        response['Content-Type'] = 'application/json'
        return response
        
# Метод для блоков
class blocksListAPIView(generics.ListAPIView):
    serializer_class = serializers.blocksSerializer
    queryset = models.blocks.objects.all()       

    @method_decorator(cache_page(60 * 60 * 2))
    @method_decorator(vary_on_cookie)
    def list(self, request, *args, **kwargs):
        # Получаем стандартный ответ от родительского класса
        response = super().list(request, *args, **kwargs)

        # Устанавливаем Content-Type в application/json
        response['Content-Type'] = 'application/json'
        
        return response


# Вывод проектных файлов
class projectsFilesListAPIView(generics.ListAPIView):
    serializer_class = serializers.projectsFilesSerializer
    queryset = models.projectsFilesModel.objects.all()
    
    def get_queryset(self):
        project_id = self.kwargs['project_id']
        return models.moviesModel.objects.filter(id=project_id)

    @method_decorator(cache_page(60 * 60 * 2))
    @method_decorator(vary_on_cookie)
    def list(self, request, *args, **kwargs):
        # Получаем стандартный ответ от родительского класса
        response = super().list(request, *args, **kwargs)

        # Устанавливаем Content-Type в application/json
        response['Content-Type'] = 'application/json'
        
        return response             