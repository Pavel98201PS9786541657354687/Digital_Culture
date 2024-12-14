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


@admin.register(moviesModel)
class UserAdmin(SortableAdminMixin, admin.ModelAdmin):
    class Meta:
        model = moviesModel
    list_display = ('weight','title', 'description', 'fileName', 
                    'formatVideo', 'dateCreated', 'dateUpdate')
    search_fields = ('title', 'description', 'fileName', 'formatVideo')
    list_filter = ('title', 'description', 'fileName', 'formatVideo')
    ordring= ('weight',)    

@admin.register(applications)
class UserAdmin(admin.ModelAdmin):
    class Meta:
        model = moviesModel
        
    list_display = ('initials','phone_number', 'email', 'comments','dateCreated')
    search_fields = ('initials','phone_number', 'email', 'comments','dateCreated')
    list_filter = ('initials','phone_number', 'email', 'comments','dateCreated')
    ordring= ('initials',)

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
