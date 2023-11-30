from rest_framework import serializers
from .models import User, Item, Event, User_Item, Event_Item

class User_ItemSerializer(serializers.HyperlinkedModelSerializer):
    # user = serializers.HyperlinkedRelatedField(
    #     view_name='user_detail',
    #     read_only=True
    # )

    user_id = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all()
        # source='user'
        #WTF WHY DOES TAKING THIS OUT FIX THE ERROR I WAS GETTING
    )

    # item = serializers.HyperlinkedRelatedField(
    #     view_name='item_detail',
    #     read_only=True
    # )

    item_id = serializers.PrimaryKeyRelatedField(
        queryset=Item.objects.all()
    )

    class Meta:
        model = User_Item
        fields = ('id', 'out_date', 'in_date', 'item_id', 'user_id')

class Event_ItemSerializer(serializers.HyperlinkedModelSerializer):

    item = serializers.HyperlinkedRelatedField(
        view_name='item_detail',
        read_only=True
    )

    item_id = serializers.PrimaryKeyRelatedField(
        queryset=Item.objects.all(),
    )

    event = serializers.HyperlinkedRelatedField(
        view_name='event_detail',
        read_only=True
    )

    event_id = serializers.PrimaryKeyRelatedField(
        queryset=Event.objects.all(),
    )

    packed_by = serializers.HyperlinkedRelatedField(
        view_name = 'user_detail',
        read_only=True
    )

    packed_by_id = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(),
        source='packed_by'
    )

    unpacked_by = serializers.HyperlinkedRelatedField(
        view_name= 'user_detail',
        read_only=True
    )

    unpacked_by_id = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(),
        allow_null = True,
        source='unpacked_by'
    )

    class Meta:
        model = Event_Item
        fields = ('id', 'item', 'item_id', 'event', 'event_id', 'packed_date', 'unpacked_date', 'packed_by', 'packed_by_id', 'unpacked_by', 'unpacked_by_id')

class UserSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = User
        fields = ('user_id', 'name', 'img')

class ItemSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = Item
        fields = ('item_id', 'desc', 'category', 'sub_category', 'img', 'instructions', 'needs_repair', 'lost')

class EventSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = Event
        fields = ('id', 'name', 'start_date', 'end_date', 'event_type')