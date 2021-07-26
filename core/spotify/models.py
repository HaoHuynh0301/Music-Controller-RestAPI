from django.db import models

class SpotifyToken(models.Model):
    user = models.CharField(max_length = 255, unique = True, blank = True)
    created_at = models.DateTimeField(auto_now_add = True)
    refresh_token = models.CharField(max_length = 255)
    access_token = models.CharField(max_length = 255)
    expires_in = models.DateTimeField()
    token_type = models.CharField(max_length = 255)
    