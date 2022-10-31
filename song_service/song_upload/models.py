import django.utils.timezone as tz
from django.db import models
import uuid
import datetime


class Song(models.Model):
    uuid = models.UUIDField(default=uuid.uuid4, editable=False, null=False)
    original_name = models.CharField(max_length=200, null=False)
    file_path = models.CharField(max_length=200, null=False)
    created_on = models.DateTimeField(default=tz.now(), null=False)

    def __str__(self):
        return self.original_name
