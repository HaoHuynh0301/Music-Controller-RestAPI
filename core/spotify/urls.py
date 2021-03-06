from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('get-auth-url/', views.AuthURLView.as_view(), name = 'get-auth-url'),
    path('is-authenticated/', views.IsAuthenticatedClass.as_view(), name = 'is_authenticated'),
    path('current-song/', views.CurrentSongView.as_view(), name = 'current-song'),
    path('redirect/', views.spotify_callback)
]