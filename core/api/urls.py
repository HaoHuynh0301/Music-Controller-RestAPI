from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('create-room/', views.CreateRoomView.as_view(), name = 'create-room')
]
