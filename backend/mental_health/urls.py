# backend/mental_health/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('analyze/', views.analyze_answers),
    path('mental-chat/', views.mental_chat),
    path('questions/', views.get_questions, name='get_questions'),
]
