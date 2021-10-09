import datetime
import json

from django.contrib.auth.models import User
from django.http import HttpResponse
from django.urls import reverse
from django.shortcuts import render, redirect
from authlib.integrations.django_client import OAuth
from rest_framework.decorators import api_view

from core.models import Token
from core.services.meta_singleton import MetaSingleton
from schema.models import Wallet
from vtb_hack.settings import CONF_URL


class FrontendToken(metaclass=MetaSingleton):
    custom_token = None


oauth = OAuth()
oauth.register(
    name='google',
    server_metadata_url=CONF_URL,
    client_kwargs={
        'scope': 'openid email profile'
    }
)


def home(request):
    user = request.session.get('user')
    if user:
        user = json.dumps(user)
    return render(request, 'home.html', context={'user': user})


@api_view(["GET"])
def login(request):
    if token := request.query_params.get('token', None):
        redirect_uri = request.build_absolute_uri(reverse('auth'))
        FrontendToken().custom_token = token
        return oauth.google.authorize_redirect(request, redirect_uri)
    return HttpResponse()


def auth(request):
    token = oauth.google.authorize_access_token(request)
    user = oauth.google.parse_id_token(request, token)
    local_user, _ = User.objects.get_or_create(
        email=user.email,
        defaults={
            'username': user.email,
            'first_name': user.given_name,
            'last_name': user.family_name,
            'email': user.email
        }
    )
    Token.objects.update_or_create(
        user=local_user,
        defaults={
            'token': FrontendToken().custom_token,
            'expires_at': datetime.datetime.fromtimestamp(token['expires_at'])
        }
    )

    Wallet.objects.get_or_create(
        owner=local_user,
        defaults={
            'amount': 10000
        }
    )

    return redirect('/')


def logout(request):
    request.session.pop('user', None)
    return redirect('/')
