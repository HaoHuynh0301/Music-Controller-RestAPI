from . import models
from django.utils import timezone
from datetime import timedelta

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
    
    