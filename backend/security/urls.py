from django.urls import path
from .views import diagnose_disease

urlpatterns = [
    path("diagnose/", diagnose_disease, name="diagnose-disease"),
]
