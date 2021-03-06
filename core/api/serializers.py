from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from . import models

class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Room
        fields = ['id', 'code', 'host', 'guest_can_pause', 
                  'votes_to_skip', 'created_at']
        
        
class CreateRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Room
        fields = ['guest_can_pause', 'votes_to_skip']
        
        
class UpdateDateRoomSerializer(serializers.ModelSerializer):
    code = serializers.CharField(validators=[])
    class Meta:
        model = models.Room
        fields = ['guest_can_pause', 'votes_to_skip', 'code']