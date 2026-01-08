from rest_framework.decorators import api_view
from rest_framework.response import Response
from .prompts import mental_health_questions
from .utils import openrouter_chatbot


# 🧠 GET questions (unchanged)
@api_view(['GET'])
def get_questions(request):
    return Response({"questions": mental_health_questions})

# 🧠 ANALYZE user answers via Cohere
@api_view(['POST'])
def analyze_answers(request):
    answers = request.data.get("answers", [])
    if not answers or len(answers) != 10:
        return Response({"error": "Please provide all 10 answers."}, status=400)

    # Build prompt string
    prompt = "The following is a mental health self-check:\n\n"
    for i, answer in enumerate(answers):
        prompt += f"Q{i+1}: {answer}\n"

    print("🧪 Received answers:", answers)
    print("🧠 Prompt to Cohere:", prompt)

    messages = [{"role": "user", "content": prompt}]
    result = openrouter_chatbot(messages)

    return Response({"analysis": result})


# 💬 Mental health chatbot conversation
@api_view(['POST'])
def mental_chat(request):
    messages = request.data.get("messages", [])
    if not messages:
        return Response({"error": "No messages provided"}, status=400)

    result = openrouter_chatbot(messages)
    return Response({"response": result or "Cohere couldn't reply 🤖💤."})
