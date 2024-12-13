from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from backend.views import *
from django.contrib.auth import views
from . import views
from . import api
from rest_framework import routers
from .views import *
 
router = routers.DefaultRouter()

urlpatterns = [
    path('api/', include(router.urls)),
    path('getListVideo', api.getVideoListAPIView.as_view(), name='getMovies'),
    path('postApplications', api.applicationsPostCreateListAPIView.as_view(), name='postApplications'),
]