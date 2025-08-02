from django.db import models

# Create your models here.

from django.db import models

class MentalHealthRecord(models.Model):
    username = models.CharField(max_length=100)
    responses = models.JSONField()
    analysis = models.TextField()
    timestamp = models.DateTimeField()
