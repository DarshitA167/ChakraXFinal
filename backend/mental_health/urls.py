# backend/mental_health/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('questions/', views.get_questions),
    path('analyze/', views.analyze_answers),
    path('chat/', views.mental_chat),
]
