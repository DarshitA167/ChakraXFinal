from django.db import models
from django.contrib.auth.models import User

class DiagnosisHistory(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    symptoms = models.TextField()
    result = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Diagnosis by {self.user or 'Anonymous'} at {self.timestamp}"
