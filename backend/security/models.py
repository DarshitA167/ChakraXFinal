from django.db import models
from django.contrib.auth.models import User

class DiagnosisHistory(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    symptoms = models.TextField()
    result = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Diagnosis by {self.user or 'Anonymous'} at {self.timestamp}"



class MentalAssessment(models.Model):
    user_id = models.IntegerField()  # Replace with ForeignKey if using user model
    summary = models.TextField()
    recommendations = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Mental Assessment for User {self.user_id} on {self.created_at.strftime('%Y-%m-%d')}"
