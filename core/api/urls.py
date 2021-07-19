from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('create-room/', views.RoomView.as_view(), name = 'create-room')
]
