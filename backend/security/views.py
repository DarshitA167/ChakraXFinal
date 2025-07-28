from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from .utils.ml_helpers import predict_disease
from .models import DiagnosisHistory

import json

@api_view(['POST'])
@permission_classes([AllowAny])
def diagnose_disease(request):
    symptoms = request.data.get('symptoms', [])
    result = predict_disease(symptoms)

    # Save to DB
    DiagnosisHistory.objects.create(
        user=request.user if request.user.is_authenticated else None,
        symptoms=json.dumps(symptoms),
        result=json.dumps(result)
    )

    return Response(result)
