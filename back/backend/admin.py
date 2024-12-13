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


# admin.site.register(moviesModel)
@admin.register(moviesModel)
class UserAdmin(SortableAdminMixin, admin.ModelAdmin):
    class Meta:
        model = moviesModel
        
    list_display = ('weight','title', 'description', 'fileName', 
                    'formatVideo', 'dateCreated', 'dateUpdate')
    search_fields = ('title', 'description', 'fileName', 'formatVideo', 'weight')
    list_filter = ('title', 'description', 'fileName', 'formatVideo', 'weight')
    ordring= ('weight',)

# admin.site.register(photoModel)
# @admin.register(photoModel)
# class UserAdmin(SortableAdminMixin, admin.ModelAdmin):
#     class Meta:
#         model = photoModel
        
#     list_display = ('weight','title', 'description', 'fileName', 
#                     'formatPhoto', 'dateCreated', 'dateUpdate')
#     search_fields = ('title', 'description', 'fileName', 'formatPhoto', 'weight')
#     list_filter = ('title', 'description', 'fileName', 'formatPhoto', 'weight')
#     ordring= ('weight',)

@admin.register(applications)
class UserAdmin(admin.ModelAdmin):
    class Meta:
        model = moviesModel
        
    list_display = ('initials','phone_number', 'email', 'comments','dateCreated')
    search_fields = ('initials','phone_number', 'email', 'comments','dateCreated')
    list_filter = ('initials','phone_number', 'email', 'comments','dateCreated')
    ordring= ('application_id',)