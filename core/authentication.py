import datetime

from rest_framework import exceptions
from rest_framework.authentication import TokenAuthentication

from core.models import Token


class ExpiringTokenAuthentication(TokenAuthentication):

    def authenticate_credentials(self, key):
        try:
            token = Token.objects.select_related('user').get(token=key)
        except Token.DoesNotExist:
            raise exceptions.AuthenticationFailed('Invalid token')

        if token.expires_at < datetime.datetime.now():
            raise exceptions.AuthenticationFailed('Token has expired')

        if not token.user.is_active:
            raise exceptions.AuthenticationFailed('User inactive or deleted')

        return token.user, token
