from django.db import models
import uuid

class User(models.Model):
    name = models.CharField(max_length=100)
    icon = models.TextField()
    user_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    def __str__(self):
        return self.user_id
