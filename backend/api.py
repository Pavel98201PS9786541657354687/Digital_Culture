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
from drf_excel.mixins import XLSXFileMixin
from drf_excel.renderers import XLSXRenderer

class getVideoListAPIView(generics.ListAPIView):
    queryset = models.moviesModel.objects.all()
    serializer_class = serializers.getVideoSerializer

class getPhotoListAPIView(generics.ListAPIView):
    queryset = models.photoModel.objects.all()
    serializer_class = serializers.getPhotoSerializer