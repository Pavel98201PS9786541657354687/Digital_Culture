from rest_framework import serializers
from .models import *
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth.password_validation import validate_password
from django.http import JsonResponse, HttpResponseBadRequest

# Метод для получения файлов
class getVideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = moviesModel
        fields = ('id','title', 'description', 'fileName', 
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
    title = serializers.SerializerMethodField()
    description = serializers.SerializerMethodField()
    title_en = serializers.SerializerMethodField()
    description_en = serializers.SerializerMethodField()
    
    class Meta:
        model = projectsFilesModel
        fields = ('id', 'projectsId', 'title','title_en',
                  'description','description_en', 'name', 'fileName',
                  'format', 'dateCreated', 'dateUpdate', 'weight')
        
    def get_title(self, obj):
        return "Title"
    
    def get_description(self, obj):
        return "Description"
        
    def get_title_en(self, obj):
        return "Title_en"
    
    def get_description_en(self, obj):
        return "Description_en"
    
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        projectsId = representation['projectsId']
        # print(instance)
        # Получаем заголовок и описание
        title = moviesModel.objects.filter(id = projectsId).values_list("title")[0][0]
        description = moviesModel.objects.filter(id = projectsId).values_list("description")[0][0]
        title_en = moviesModel.objects.filter(id = projectsId).values_list("title_en")[0][0]
        description_en = moviesModel.objects.filter(id = projectsId).values_list("description_en")[0][0]
        representation['title'] = title
        representation['title_en'] = title_en
        representation['description'] = description
        representation['description_en'] = description_en
        return representation 