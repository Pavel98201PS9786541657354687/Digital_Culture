from rest_framework import serializers
from .models import *
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth.password_validation import validate_password
from django.http import JsonResponse, HttpResponseBadRequest

# Метод для тестирования
class getVideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = moviesModel
        fields = '__all__'

# Метод для тестирования
class getPhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = photoModel
        fields = '__all__'