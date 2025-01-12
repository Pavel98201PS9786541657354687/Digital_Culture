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

# Метод для merge видео и проектных файлов
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
        request = self.context.get('request')
        projectsId = obj.id
        files = projectsFilesModel.objects.filter(projectsId=projectsId)
        
        # Сериализуем файлы
        serializer = ProjectsFilesModelSerializer(files, many=True)
        
        # Добавляем абсолютные URL к каждому файлу
        for file in serializer.data:
            if 'fileName' in file and file['fileName']:
                file['fileName'] = request.build_absolute_uri(file['fileName'])

        return serializer.data

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        return representation