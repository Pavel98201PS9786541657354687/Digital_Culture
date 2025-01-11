from rest_framework import serializers
from .models import *
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth.password_validation import validate_password
from django.http import JsonResponse, HttpResponseBadRequest
import pandas as pd

# Метод для получения файлов
class getVideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = moviesModel
        fields = '__all__'

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

class ProjectsFilesModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = projectsFilesModel
        fields = '__all__'

# Метод для вывода проектных файлов
class projectsFilesSerializer(serializers.ModelSerializer):
    files = serializers.SerializerMethodField()

    class Meta:
        model = moviesModel
        fields = ('id', 'title', 'title_en', 'description', 'description_en', 'files')

    def get_files(self, obj):
        return "Title"  # Это может быть изменено на что-то более информативное

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        try:
            projectsId = representation['id']
            files = projectsFilesModel.objects.filter(projectsId=projectsId)
            serializer = ProjectsFilesModelSerializer(files, many=True)  # Сериализуем файлы
            representation['files'] = serializer.data  # Добавляем сериализованные данные
        except Exception as e:
            representation['files'] = []
            print(f"Error: {e}")  # Для отладки
        return representation
 