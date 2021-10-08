from channels.db import database_sync_to_async
from channels.exceptions import DenyConnection
from channels.generic.websocket import AsyncJsonWebsocketConsumer


class BaseConsumer(AsyncJsonWebsocketConsumer):

    async def connect(self):
        obj_pk = self.scope['url_route']['kwargs']['pk']
        self.name_group = f"base_{obj_pk}"

        await self.channel_layer.group_add(
            self.name_group,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(
            self.name_group,
            self.channel_name
        )

    # # Receive message from WebSocket
    # async def receive(self, text_data):
    #     text_data_json = json.loads(text_data)
    #     message = text_data_json['message']
    #
    #     # Send message to room group
    #     await self.channel_layer.group_send(
    #         self.event_group_name,
    #         {
    #             'type': 'chat_message',
    #             'message': message
    #         }
    #     )
    #
    # # Receive message from room group
    async def data_message(self, event):
        await self.send(text_data=event["text"])


@database_sync_to_async
def check_user(pk):
    return True


async def a_check_user(pk):
    return await check_user(pk)


class UserConsumer(BaseConsumer):

    async def connect(self):
        user_pk = self.scope['url_route']['kwargs']['pk']
        self.name_group = f"user_{user_pk}"

        is_exists = await a_check_user(user_pk)
        if not is_exists:
            raise DenyConnection(f"CustomUser {user_pk} not found")

        await self.channel_layer.group_add(
            self.name_group,
            self.channel_name
        )

        await self.accept()


class EventConsumer(BaseConsumer):

    async def connect(self):
        event_pk = self.scope['url_route']['kwargs']['pk']
        self.name_group = f"event_{event_pk}"

        is_exists = await a_check_event(event_pk)
        if not is_exists:
            raise DenyConnection(f"Event {event_pk} not found")

        await self.channel_layer.group_add(
            self.name_group,
            self.channel_name
        )

        await self.accept()


@database_sync_to_async
def check_event(pk):
    return True


async def a_check_event(pk):
    return await check_event(pk)
