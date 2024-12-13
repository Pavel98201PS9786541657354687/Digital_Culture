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


# Метод для отправки заявки
class applicationsPostCreateListAPIView(generics.ListCreateAPIView):
    serializer_class = serializers.applicationsPostSerializer
    queryset = models.applications.objects.all()
    def create(self, request, *args, **kwargs):
        try:
            data = request.data
            serializer_class = serializers.applicationsPostSerializer(data=data)
            queryset = models.applications.objects.all()
            serializer_class.is_valid(raise_exception=True)
            serializer_class.save() 
            return Response({"ответ": "Заявка отправлена",
                             "status": 200})
        except:
            return Response({"ответ": "Ошибка", "Подробнее": serializer_class.errors,
                             "Ошибка от django": str(traceback.format_exc())})