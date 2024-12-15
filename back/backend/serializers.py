from rest_framework import serializers
from .models import *
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth.password_validation import validate_password
from django.http import JsonResponse, HttpResponseBadRequest

# Метод для получения файлов
class getVideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = moviesModel
        fields = ('title', 'description', 'fileName', 
                  'formatVideo', 'weight')

# Метод для отправки формы заявок
class applicationsPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = applications
        fields = '__all__'

# Метод для блоков
class blocksSerializer(serializers.ModelSerializer):
    class Meta:
        model = blocks
        fields = '__all__'

# Метод для вывода проектных файлов
class projectsFilesSerializer(serializers.ModelSerializer):
    class Meta:
        model = projectsFilesModel
        fields = '__all__'