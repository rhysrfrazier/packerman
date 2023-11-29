from django.db import models
import uuid

class Users(models.Model):
    name = models.CharField(max_length=100)
    img = models.TextField()
    user_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    def __str__(self):
        return self.user_id

class Items(models.Model):
    desc = models.TextField()
    category = models.CharField(max_length=200)
    sub_category = models.CharField(max_length=200)
    img = models.TextField()
    instructions = models.TextField()
    needs_repair = models.BooleanField(default=False)
    lost = models.BooleanField(default=False)
    item_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    def __str__(self):
        return self.item_id
    
class Events(models.Model):
    name = models.CharField(max_length=200)
    start_date = models.DateField(auto_now=False, auto_now_add=False)
    end_date = models.DateField(auto_now=False, auto_now_add=False)
    event_type = models.CharField(max_length=200)

    def __str__(self):
        return self.name
    
class User_Items(models.Model):
    item_id = models.ForeignKey(Items, on_delete=models.CASCADE, related_name='items')
    user_id = models.ForeignKey(Users, on_delete=models.CASCADE, related_name='users')
    out_date = models.DateField(auto_now=False, auto_now_add=False)
    in_date = models.DateField(auto_now=False, auto_now_add=False)

class Event_Items(models.Model):
    item_id = models.ForeignKey(Items, on_delete=models.CASCADE, related_name='packed_items')
    event_id = models.ForeignKey(Events, on_delete=models.CASCADE, related_name = 'events')
    packed_date = models.DateField(auto_now=False, auto_now_add=False)
    unpacked_date = models.DateField(auto_now=False, auto_now_add=False)
    packed_by = models.ForeignKey(Users, on_delete=models.CASCADE, related_name='packing_user')
    unpacked_by = models.ForeignKey(Users, on_delete=models.CASCADE, related_name='unpacking_user')