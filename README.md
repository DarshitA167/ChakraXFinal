<div align="center">

# 🛡️ ChakraX 🧠
### *The Future of Integrated Security & Wellness*

[![Python](https://img.shields.io/badge/Python-3.10%2B-blue?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![Django](https://img.shields.io/badge/Django-5.0-092E20?style=for-the-badge&logo=django&logoColor=white)](https://www.djangoproject.com/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

<br />

<p align="center">
  <img src="https://via.placeholder.com/800x400.png?text=ChakraX+Dashboard+Preview" alt="ChakraX Dashboard" width="100%" />
</p>

</div>

---

## 🚀 Overview

**ChakraX** is a revolutionary dual-domain platform that bridges the gap between digital safety and personal well-being. In an era where online threats and mental fatigue go hand-in-hand, ChakraX provides a unified sanctuary.

On one side, it offers **military-grade cybersecurity tools** to scan for email breaches, detect phishing attempts, and generate detailed pdf audits. On the other, it provides a **compassionate AI mental health companion**, offering assessment, support, and resources to ensure your mind stays as secure as your data.

---

## ✨ Key Features

### 🛡️ Cybersecurity Arsenal
> *Protecting your digital footprint with advanced intelligence.*

- **📧 Email Breach Scanner**: Instantly verifies if your credentials have been exposed in known data leaks using the **LeakCheck API**.
- **🎣 Phishing Detection Engine**: Analyzes URLs and domains for malicious intent using **AbuseIPDB** and custom ML heuristics.
- **📄 Automated Audit Reports**: Generates professional PDF reports summarizing security posture, breach history, and risk scores.
- **🔍 Network Scanning**: (Beta) Deep scan integration for network vulnerabilities.

### 🧠 Mental Health Sanctuary
> *Empowering your mind with empathetic AI.*

- **🤖 AI Therapist Companion**: A 24/7 intelligent chatbot powered by **Cohere/OpenRouter** trained to provide supportive, non-judgmental conversation.
- **📝 Self-Assessment Tools**: Interactive questionnaires to track your emotional well-being and stress levels.
- **🌱 Resource Library**: Curated guides and tips for maintaining digital and mental hygiene.

---

## 🛠️ Technology Stack

| Component | Tech | Description |
|-----------|------|-------------|
| **Frontend** | ![React](https://img.shields.io/badge/-React-black?style=flat&logo=react) | Modern, responsive UI with React 19 and Tailwind CSS. |
| **Backend** | ![Django](https://img.shields.io/badge/-Django-black?style=flat&logo=django) | Robust API handling, PDF generation, and orchestration. |
| **AI / ML** | ![OpenAI](https://img.shields.io/badge/-OpenRouter-black?style=flat&logo=openai) | LLM integration for the chatbot and predictive security models. |
| **Database** | ![SQLite](https://img.shields.io/badge/-SQLite-black?style=flat&logo=sqlite) | Lightweight and efficient data storage (PostgreSQL ready). |
| **Tools** | ![Docker](https://img.shields.io/badge/-Docker-black?style=flat&logo=docker) | Containerization for easy deployment. |

---

## ⚡ Getting Started

Follow these steps to set up ChakraX locally.

### Prerequisites
- **Python** 3.10 or higher
- **Node.js** 18 or higher
- **npm** or **yarn**

### 1️⃣ Backend Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/ChakraX.git
cd ChakraX/backend

# Create a virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Server start
python manage.py runserver
```

### 2️⃣ Frontend Setup

```bash
# Navigate to frontend directory
cd ../frontend-fixed

# Install dependencies
npm install

# Start the development server
npm start
```

### 3️⃣ Environment Configuration

Create a `.env` file in the `backend` directory with the following keys:

```env
ABUSEIPDB_API_KEY=your_abuseipdb_key
OPENROUTER_API_KEY=your_openrouter_key
SECRET_KEY=your_django_secret
DEBUG=True
```

---

## 📸 Screen Showcase

| Security Dashboard | Mental Health Chat |
|:---:|:---:|
| <img src="https://via.placeholder.com/400x250.png?text=Security+Scan" width="400" /> | <img src="https://via.placeholder.com/400x250.png?text=AI+Chat" width="400" /> |

<div align="center">
  <br />

  <p><i>Building a safer, healthier digital future.</i></p>
  <p><b>All rights reserved by @Darshit J. Ayar</b></p>
  <a href="#top">⬆ Back to Top</a>
</div>
