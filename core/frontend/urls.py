from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name = 'index'),
    path('join/', views.index, name = 'join'),
    path('create/', views.index, name = 'create'),
    path('room/<str:roomCode>/', views.index, name = 'room')
]
