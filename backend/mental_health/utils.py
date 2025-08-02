import requests
import os

API_KEY = os.getenv("DEEPSEEK_API_KEY")

import requests
import os

API_KEY = os.getenv("OPENROUTER_API_KEY")

def openrouter_chatbot(prompt_history, model="mistralai/mistral-7b-instruct"):
    url = "https://openrouter.ai/api/v1/chat/completions"
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {os.getenv('OPENROUTER_API_KEY')}",
    }

    messages = [{"role": msg["role"], "content": msg["content"]} for msg in prompt_history]

    data = {
        "model": model,
        "messages": messages,
        "temperature": 0.7
    }

    print("📤 Sending to openrouter:", data)
    response = requests.post(url, headers=headers, json=data)
    print("📥 Response Status:", response.status_code)
    print("📥 Response Body:", response.text)

    if response.ok:
        return response.json()["choices"][0]["message"]["content"]
    else:
        return f"⚠️ OpenRouter error {response.status_code}: {response.reason}"
