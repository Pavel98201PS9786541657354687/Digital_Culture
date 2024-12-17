from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import *
from django.http import HttpResponseRedirect
from django.utils.html import format_html
from django.utils.safestring import mark_safe
from django.urls import path
from django.contrib import messages
from django.shortcuts import redirect
from .models import *
from django.apps import AppConfig
from adminsortable2.admin import SortableAdminMixin
from adminsortable2.admin import SortableStackedInline

class projectsFileInline(SortableStackedInline):
    model = projectsFilesModel
    extra = 0

@admin.register(moviesModel)
class UserAdmin(SortableAdminMixin, admin.ModelAdmin):
    inlines = [
        projectsFileInline,
    ]
    class Meta:
        model = moviesModel
    list_display = ('weight','title', 'description', 'fileName', 
                    'formatVideo', 'dateCreated', 'dateUpdate')
    search_fields = ('title', 'description', 'fileName', 'formatVideo')
    list_filter = ('title', 'description', 'fileName', 'formatVideo')
    ordring= ('weight',)   

@admin.register(projectsFilesModel)
class UserAdmin(admin.ModelAdmin):
    class Meta:
        model = projectsFilesModel
    list_display = ('projectsId','name', 'fileName', 
                    'format', 'dateCreated', 'dateUpdate')
    search_fields = ('projectsId','name', 'fileName', 'format')
    list_filter = ('projectsId','name', 'fileName', 'format')
    ordring= ('dateUpdate',)   

@admin.register(applications)
class UserAdmin(admin.ModelAdmin):
    class Meta:
        model = applications
        
    list_display = ('initials','phone_number', 'company', 
                    'sphere_activity','url_links', 
                    'comments','dateCreated')
    search_fields = ('initials','phone_number', 'company', 
                    'sphere_activity',
                    'dateCreated')
    list_filter = ('initials','phone_number', 'company', 
                   'sphere_activity',
                   'dateCreated')
    ordring= ('dateCreated',)

@admin.register(blocks)
class UserAdmin(SortableAdminMixin, admin.ModelAdmin):
    class Meta:
        model = blocks

    list_display = ('weight','title', 'description', 
                    'dateCreated', 'dateUpdate')
    search_fields = ('title', 'description',
                     'dateCreated', 'dateUpdate','weight')
    list_filter = ('title', 'description', 
                   'dateCreated', 'dateUpdate', 'weight')
    ordring= ('weight',)
