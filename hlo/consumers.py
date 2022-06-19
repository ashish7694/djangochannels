import json
from random import randint
# from time import sleep
from asyncio import sleep
from channels.generic.websocket import AsyncWebsocketConsumer
# from channels.consumer import AsyncConsumer
from channels.exceptions import StopConsumer
from django.http import HttpResponse
import requests




# zeneric class.......
class VboxConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()
        print(self.scope['url_route']['kwargs']['vbox'])
        print(self.channel_name)
        
    async def receive(self, text_data):
        print('vbox send message',text_data)
        for i in text_data:
            await self.send(i)
            await sleep(1)
        
    async def disconnect(self, code):
        print('disconect',code)
        raise StopConsumer()
    

class GraphConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()
        print(self.scope['url_route']['kwargs']['groupws'])
        
        print(self.channel_name)
        print(self.scope['user'])
        
    async def receive(self, text_data):
        endpoint = (self.scope['url_route']['kwargs']['groupws'])
        response = requests.get("https://api.covid19api.com/dayone/country/south-africa/status/confirmed/" + endpoint ).json()
        a = response[:20]
        await self.send(json.dumps({'gra':a}))
        await sleep(1)
            
    async def disconnect(self, code):
        print('disconect',code)
        raise StopConsumer()
    
    
class BarConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        pk = 'patna'
        self.room_group_name = pk
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        await self.accept()
        
    async def receive(self, text_data):
            await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'system_load',
                'data': text_data
            }
        )

    async def system_load(self, event):
        a = randint(10,30)
        await self.send(text_data = json.dumps(a))
        await sleep(1)
        
    async def disconnect(self, code):
        print('disconect',code)
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )
        raise StopConsumer()




# without zeneric consumer class...........

# class GraphConsumer(AsyncConsumer):
#     async def websocket_connect(self,event):
#         print(event)
#         await self.send({
#             "type": "websocket.accept",
#         })
        
#     async def websocket_receive(self, event):
#         print(list(event['text']))
#         print(type(list(event['text'])))
#         for i in list(event['text']):
#             await self.send({
#                     "type": "websocket.send",
#                     "text": str(i),
#                 })
#             await sleep(1)
        
#     async def websocket_disconnect(self, code):
#         print('disconect',code)
#         raise StopConsumer()
        
        
        
        
        
        # for i in range(20):
        #     await self.send(json.dumps({'value':randint(-20,20),'mobile':randint(-40,40)}))
        #     await sleep(1)
        