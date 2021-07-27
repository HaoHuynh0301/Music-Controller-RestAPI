from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('get-auth-url/', views.AuthURLView.as_view(), name = 'get-auth-url'),
    path('is_authenticated/', views.IsAuthenticatedClass.as_view(), name = 'is_authenticated'),
    path('redirect/', views.spotify_callback)
]