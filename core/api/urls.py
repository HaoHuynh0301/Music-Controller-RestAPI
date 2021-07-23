from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('room/', views.RoomsView.as_view(), name = 'rooms'),
    path('create-room/', views.CreateRoomView.as_view(), name = 'create-room'),
    path('get-room/', views.DetailRoomView.as_view(), name = 'room-detail'),
    path('join-room/', views.JoinRoomView.as_view(), name = 'join-room'),
    path('user-in-room/', views.UserInRoomView.as_view(), name = 'user-in-room'),
    path('leave-room/', views.LeaveRoomView.as_view(), name = 'leave-room')
]
