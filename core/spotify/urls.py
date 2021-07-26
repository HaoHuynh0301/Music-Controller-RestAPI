from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('get-auth-url/', views.AuthURLView.as_view(), name = 'get-auth-url'),
    path('redirect/', views.spotify_callback)
]