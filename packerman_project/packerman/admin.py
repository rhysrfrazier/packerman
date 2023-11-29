from django.contrib import admin

from .models import User, Item, Event, User_Item, Event_Item

admin.site.register(User)
admin.site.register(Item)
admin.site.register(Event)
admin.site.register(User_Item)
admin.site.register(Event_Item)
