from .consumers import GraphConsumer,VboxConsumer,BarConsumer
from django.urls import path


ws_urlpatterns = [
    path('ws/graph/<str:groupws>/', GraphConsumer.as_asgi()),
    path('ws/vbox/<str:vbox>/', VboxConsumer.as_asgi()),
    path('ws/barbox/', BarConsumer.as_asgi())
]