from django.shortcuts import render
from rest_framework import generics
from .serializers import UserSerializer, ItemSerializer, EventSerializer, User_ItemSerializer, Event_ItemSerializer
from .models import User, Item, Event, User_Item, Event_Item

class UserList(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class ItemList(generics.ListCreateAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer

class ItemDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer

class EventList(generics.ListCreateAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

class EventDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

class User_ItemList(generics.ListCreateAPIView):
    queryset = User_Item.objects.all()
    serializer_class = User_ItemSerializer

class User_ItemDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = User_Item.objects.all()
    serializer_class = User_ItemSerializer

class Event_ItemList(generics.ListCreateAPIView):
    queryset = Event_Item.objects.all()
    serializer_class = Event_ItemSerializer

class Event_ItemDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Event_Item.objects.all()
    serializer_class = Event_ItemSerializer