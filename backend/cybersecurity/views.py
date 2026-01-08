import socket
import time
import requests
from django.views.decorators.csrf import csrf_exempt
from django.core.cache import cache
from django.http import JsonResponse, FileResponse
import json
from reportlab.pdfgen import canvas
from io import BytesIO
import os

COOLDOWN_SECONDS = 10
ABUSEIPDB_API_KEY = "YOUR_API_KEY"  # Replace with real key

@csrf_exempt
def check_email_security(request):
    if request.method != "POST":
        return JsonResponse({"error": "Only POST allowed"}, status=405)

    try:
        data = json.loads(request.body)
        email = data.get("email")
        if not email:
            return JsonResponse({"error": "Email is required"}, status=400)
    except:
        return JsonResponse({"error": "Invalid JSON"}, status=400)

    user_ip = request.META.get("REMOTE_ADDR")
    cache_key = f"cyber_check_{user_ip}"
    last_time = cache.get(cache_key)
    current_time = time.time()

    if last_time and current_time - last_time < COOLDOWN_SECONDS:
        remaining = int(COOLDOWN_SECONDS - (current_time - last_time))
        return JsonResponse({"cooldown": remaining}, status=429)

    # 🔐 1. Email Breach Check
    breach_api = f"https://leakcheck.io/api/public?check={email}"
    try:
        breach_res = requests.get(breach_api, headers={"User-Agent": "ChakraX"})
        breach_data = breach_res.json()
        breaches = breach_data.get("sources", []) if breach_data.get("found") else []
    except:
        breaches = []

    # 🎣 2. Phishing Check (via AbuseIPDB)
    phishing_result = {
        "ip": None,
        "abuseScore": None,
        "isPhishing": False,
        "error": None
    }

    try:
        ip = socket.gethostbyname(email.split('@')[-1])
        abuse_res = requests.get(
            "https://api.abuseipdb.com/api/v2/check",
            headers={"Key": ABUSEIPDB_API_KEY},
            params={"ipAddress": ip, "maxAgeInDays": 90}
        )
        data = abuse_res.json().get("data", {})
        abuse_score = data.get("abuseConfidenceScore", 0)
        phishing_result.update({
            "ip": ip,
            "abuseScore": abuse_score,
            "isPhishing": abuse_score > 50
        })
    except Exception as e:
        phishing_result["error"] = str(e)

    # 📝 3. Generate PDF
    buffer = BytesIO()
    pdf = canvas.Canvas(buffer)
    pdf.setFont("Helvetica", 12)

    pdf.drawString(100, 800, "ChakraX Cybersecurity Report")
    pdf.drawString(100, 780, f"Email Scanned: {email}")
    pdf.drawString(100, 760, f"Breaches Found: {len(breaches)}")

    y = 740
    for breach in breaches[:40]:
        name = breach.get("name", "Unknown")
        date = breach.get("date", "")
        pdf.drawString(100, y, f"- {name} ({date})")
        y -= 15
        if y < 100:
            pdf.showPage()
            y = 800

    # ➕ Add Phishing Section
    pdf.showPage()
    pdf.drawString(100, 800, "🎣 Phishing Check")
    if phishing_result.get("error"):
        pdf.drawString(100, 780, f"Error: {phishing_result['error']}")
    else:
        pdf.drawString(100, 780, f"IP: {phishing_result.get('ip', 'N/A')}")
        pdf.drawString(100, 760, f"Abuse Score: {phishing_result.get('abuseScore', 'N/A')}")
        verdict = "⚠️ Suspicious" if phishing_result["isPhishing"] else "✅ Clean"
        pdf.drawString(100, 740, f"Verdict: {verdict}")

    pdf.showPage()
    pdf.save()
    buffer.seek(0)

    report_filename = f"{email.replace('@', '_at_')}_report.pdf"
    with open(f"/tmp/{report_filename}", "wb") as f:
        f.write(buffer.read())

    cache.set(cache_key, current_time, COOLDOWN_SECONDS)
    return JsonResponse({
        "breaches": breaches,
        "phishing": phishing_result,
        "pdf_filename": report_filename
    })

@csrf_exempt
def download_pdf_report(request, filename):
    path = f"/tmp/{filename}"
    if os.path.exists(path):
        return FileResponse(open(path, 'rb'), as_attachment=True, filename=filename)
    return JsonResponse({"error": "Report not found"}, status=404)
