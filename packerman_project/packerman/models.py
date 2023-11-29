from django.db import models
import uuid

class User(models.Model):
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
    
