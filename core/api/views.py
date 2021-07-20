from . import models, serializers
from rest_framework import viewsets, permissions, status, generics
from django.contrib.auth import authenticate
from django.shortcuts import render, get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import action, permission_classes, api_view
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.core.mail import EmailMessage
from django.conf import settings

class RoomView(generics.CreateAPIView):
    queryset = models.Room.objects.all()
    serializer_class = serializers.RoomSerializer
    
    
class CreateRoomView(APIView):
    serializer_class = serializers.CreateRoomSerializer
    
    def post(self, request, format = None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
            
        serializer = self.serializer_class(data = request.data)
        if serializer.is_valid():
            guest_can_pause = serializer.validated_data['guest_can_pause']
            votes_to_skip= serializer.validated_data['votes_to_skip']
            host = self.request.session.session_key
            query = models.Room.objects.filter(host = host)
            if query.exists():
                room = query[0]
                room.guest_can_pause = guest_can_pause
                room.votes_to_skip = votes_to_skip
                room.save(update_fields = ['guest_can_pause', 'votes_to_skip'])
            else:
                room = models.Room.objects.create(host = host, guest_can_pause = guest_can_pause, votes_to_skip = votes_to_skip)
            return Response(serializers.RoomSerializer(room).data, status = status.HTTP_201_CREATED)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)


