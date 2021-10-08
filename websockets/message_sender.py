import json
import logging

from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer


def send_to_ws(group, data):
    try:
        channel_layer = get_channel_layer()
        text = json.dumps(data, ensure_ascii=False)
        async_to_sync(channel_layer.group_send)(str(group), {"type": "data.message", "text": text})
        logging.debug(f'В сокет группу {group} отправлено сообщение: {data}')
    except ConnectionRefusedError as e:
        logging.error(f'Ошибка подключения: {e}')
