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
from django.views.decorators.csrf import ensure_csrf_cookie


class RoomsView(generics.ListAPIView):
    serializer_class = serializers.RoomSerializer
    permission_classes = [permissions.AllowAny]
    queryset = models.Room.objects.all()
    
    
class CreateRoomView(APIView):
    serializer_class = serializers.CreateRoomSerializer
    permission_classes = [permissions.AllowAny]
    
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
                return Response(serializers.RoomSerializer(room).data, status=status.HTTP_200_OK)
            else:
                room = models.Room.objects.create(host = host, guest_can_pause = guest_can_pause, votes_to_skip = votes_to_skip)
            return Response(serializers.RoomSerializer(room).data, status = status.HTTP_201_CREATED)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
    
    
class JoinRoomView(APIView):
    lookup_url_kwarg = 'code'
    permission_classes = [permissions.AllowAny]

    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        code = request.data.get(self.lookup_url_kwarg)
        if code != None:
            room_result = models.Room.objects.filter(code=code)
            if len(room_result) > 0:
                room = room_result[0]
                self.request.session['room_code'] = code
                return Response({'message': 'Room Joined!'}, status=status.HTTP_200_OK)

            return Response({'Bad Request': 'Invalid Room Code'}, status=status.HTTP_400_BAD_REQUEST)

        return Response({'Bad Request': 'Invalid post data, did not find a code key'}, status=status.HTTP_400_BAD_REQUEST)

    
class DetailRoomView(APIView):
    serializer_class = serializers.RoomSerializer
    permission_classes = [permissions.AllowAny]
    lookup_url_kwarg = 'code'
    
    def get(self, request, format = None):
        code = request.GET.get(self.lookup_url_kwarg)
        if code != None:
            room = models.Room.objects.filter(code = code)
            if len(room) > 0:
                data = self.serializer_class(room[0]).data
                data['is_host'] = self.request.session.session_key == room[0].code
                print(data)
                return Response(data, status = status.HTTP_200_OK)
            return Response('Room code is not exist!', status = status.HTTP_404_NOT_FOUND)
        return Response('Parameters are invalid', status = status.HTTP_400_BAD_REQUEST)

