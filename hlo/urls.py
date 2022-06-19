from django import views
from django.urls import path
from . import views

urlpatterns = [
    path('home/<str:name>/', views.home, name='home'),
    path('apireq/', views.apireq, name='apireq')
]