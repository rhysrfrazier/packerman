from rest_framework import serializers
from .models import User, Item, Event, User_Item, Event_Item

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('user_id', 'name', 'img')

class ItemSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Item
        field = ('item_id', 'desc', 'category', 'sub_category', 'img', 'instructions', 'needs_repair', 'lost')

# class EventSerializer(serializers.HyperlinkedModelSerializer):
#     class Meta:
#         model = Event