from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('room/', views.RoomsView.as_view(), name = 'rooms'),
    path('create-room/', views.CreateRoomView.as_view(), name = 'create-room'),
    path('get-room/', views.DetailRoomView.as_view(), name = 'room-detail')
]
