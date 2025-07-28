from rest_framework import serializers

class DiseaseDetectionSerializer(serializers.Serializer):
    symptoms = serializers.ListField(
        child=serializers.CharField(),
        required=False
    )
    image = serializers.ImageField(required=False)

    def validate(self, data):
        if not data.get('symptoms') and not data.get('image'):
            raise serializers.ValidationError("Provide either symptoms or an image")
        return data
