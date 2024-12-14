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

# Метод для вывода видео файлов
class getVideoListAPIView(generics.ListAPIView):
    queryset = models.moviesModel.objects.all()
    serializer_class = serializers.getVideoSerializer

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
            message = str(f"Новый пользователь: {data['initials']}, оставил заявку.\nКонтакты для связи\nТелефон: {data['phone_number']},\nE-mail: {data['email']}.\nОписание: {data['comments']}")
            serializer_class = serializers.applicationsPostSerializer(data=data)
            queryset = models.applications.objects.all()
            serializer_class.is_valid(raise_exception=True)
            serializer_class.save() 
            result_send_message = send_applications(message)
            if result_send_message == 200:
                return Response({"ответ": "Заявка отправлена",
                             "status": 200})
            else:
                return Response({"ответ": "Возникла ошибка отправки заявки",
                                 "Подробнее": result_send_message,
                                 "status": 400})
        except:
            return Response({"ответ": "Ошибка", "Подробнее": serializer_class.errors,
                             "Ошибка от django": str(traceback.format_exc())})
        
# Метод для блоков
class blocksListAPIView(generics.ListAPIView):
    serializer_class = serializers.blocksSerializer
    queryset = models.blocks.objects.all()                           