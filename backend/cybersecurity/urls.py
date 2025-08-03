from django.urls import path
from .views import check_email_security , download_pdf_report

urlpatterns = [
    path('check/', check_email_security, name='check_email_security'),
    path('download-report/<str:filename>/', download_pdf_report),

]
