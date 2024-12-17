from django.http import response
from django.http import HttpResponse
from django.http import HttpResponseRedirect
from django.shortcuts import render
from django.conf import settings
from django.core.files.storage import FileSystemStorage
from django.template.context_processors import media
import os
from django.views.generic import TemplateView
from django.utils.safestring import mark_safe
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.db.models import Prefetch
from rest_framework import viewsets
from rest_framework import views
from .serializers import *
from django_filters.rest_framework import DjangoFilterBackend
from .models import *
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import generics
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.utils.text import slugify
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from django.shortcuts import get_object_or_404
from rest_framework.exceptions import NotFound
from django.forms.models import model_to_dict

def index(request):
    return  render(request, 'index.html', {})