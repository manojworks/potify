import django
from django.db import models
import uuid


class Song(models.Model):

    class SongState(models.IntegerChoices):
        UPLOADED = 1
        MANUAL_CHECK = 2
        ATTRIBUTES_ON_FILE = 3
        OTHER_ATTRIBUTES = 4
        LYRICS = 5
        VALIDATED = 6
        READY_FOR_USE = 7

    uuid = models.UUIDField(default=uuid.uuid4, editable=False, null=False)
    original_name = models.CharField(max_length=200, null=False)
    file_path = models.CharField(max_length=200, null=False)
    created_on = models.DateTimeField(default=django.utils.timezone.now, null=False)
    status = models.IntegerField(choices=SongState.choices, default=SongState.UPLOADED)

    def __str__(self):
        return self.original_name
