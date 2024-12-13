from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from backend.views import *
from django.contrib.auth import views
from . import views
from . import api
from rest_framework import routers
 
# import everything from views
from .views import *
 
# define the router
router = routers.DefaultRouter()

 
# specify URL Path for rest_framework
urlpatterns = [
    path('api/', include(router.urls)),
    path('getListVideo', api.getVideoListAPIView.as_view(), name='getMovies'),
    # path('getListPhoto', api.getPhotoListAPIView.as_view(), name='getPhoto'),
]