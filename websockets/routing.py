from django.conf.urls import url
from django.urls import re_path

from websockets.consumers import UserConsumer, EventConsumer

websocket_urlpatterns = [
    re_path(r'^ws/user/(?P<pk>\w+)', UserConsumer.as_asgi()),
    re_path(r'^ws/event/(?P<pk>\w+)', EventConsumer.as_asgi()),
]
