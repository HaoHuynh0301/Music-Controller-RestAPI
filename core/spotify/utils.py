from . import models
from django.utils import timezone
from datetime import timedelta
from requests import post, put, get
from .credentials import CLIENT_ID, CLIENT_SECRET

def get_user_token(session_id):
    userToken = models.SpotifyToken.objects.filter(user = session_id)
    if userToken.exists():
        return userToken[0]
    return None

def update_or_create_user_tokens(session_id, access_token, expires_in, refresh_token, token_type):
    tokens = get_user_token(session_id)
    expires_in = timezone.now() + timedelta(seconds = expires_in)
    if tokens:
        tokens.access_token = access_token
        tokens.refresh_token = refresh_token
        tokens.expires_in = expires_in
        tokens.token_type = token_type
        tokens.save()
    else:
        tokens = models.SpotifyToken(user = session_id, access_token = access_token, 
                                     refresh_token = refresh_token, expires_in = expires_in, 
                                     token_type = token_type)
        tokens.save()
        
        
def is_spotify_authenticated(session_id):
    tokens = get_user_token(session_id)
    if tokens:
        expiry = tokens.expires_in
        if expiry <= timezone.now():
            return True
    return False

def refresh_spotify_token(session_id):
    refresh_token = get_user_token(session_id).refresh_token

    response = post('https://accounts.spotify.com/api/token', data={
        'grant_type': 'refresh_token',
        'refresh_token': refresh_token,
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET
    }).json()

    access_token = response.get('access_token')
    token_type = response.get('token_type')
    expires_in = response.get('expires_in')
    refresh_token = response.get('refresh_token')

    update_or_create_user_tokens(
        session_id, access_token, token_type, expires_in, refresh_token)
    
            
    
    