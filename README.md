# 🛡️ ScamLens AI — Autonomous Student Protection Shield

> **Autonomous Verification for Student Internships, Scholarships & Job Offers**  
> *Built by **Team FourSight** for **Code Meet '26***

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-black?style=for-the-badge&logo=vercel)](https://scamlens-ai-five.vercel.app/)
[![Powered by Gemini](https://img.shields.io/badge/AI-Google%20Gemini%203.5%20Flash-4285F4?style=for-the-badge&logo=google)](https://ai.google.dev/)
[![Database & Auth](https://img.shields.io/badge/Backend-Supabase-3ECF8E?style=for-the-badge&logo=supabase)](https://supabase.com/)

---

## 🌐 Live Application
- **Production URL:** [https://scamlens-ai-five.vercel.app/](https://scamlens-ai-five.vercel.app/)
- **Repository:** [https://github.com/Limitha1/ScamLens-AI](https://github.com/Limitha1/ScamLens-AI)

---

## 🎯 The Problem
University students are increasingly targeted by predatory recruitment scams, fake remote internships demanding "refundable security deposits", and counterfeit scholarship foundations. Students frequently lose funds and sensitive personal data because standard spam filters fail to detect nuanced, high-pressure conversational manipulation.

## 🚀 Key Features

- **⚡ Live Google Gemini 3.5 Flash AI Engine**: Analyzes suspicious WhatsApp forwards, Telegram task messages, LinkedIn recruitment DMs, and offer letters in real-time with structured JSON threat modeling.
- **📊 Granular Risk Scoring (0–100)**: Evaluates Urgency manipulation, Financial demand traps, Domain authenticity, and Sender credibility.
- **🔍 Exact Phrase Highlighting**: Flags predatory clauses (e.g. upfront onboarding kits, unprompted selection, wire fees) with educational explanations.
- **🛡️ Actionable Verification Checklist**: Interactive step-by-step guidance for students (domain checking, campus placement cell verification, public forum searching) with celebration triggers.
- **🔐 User Authentication**: Persistent student & campus ambassador profiles powered by **Supabase Auth** with 1-click Quick Demo logins.
- **📢 Community Threat Shield**: Students report fraudulent recruiters to a centralized **Supabase** database to protect fellow peers across institutions.
- **🖼️ Shareable Warning Cards**: Exportable security summaries for student WhatsApp and Telegram groups.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Frontend Framework** | React 19, Vite 8 |
| **Styling** | Tailwind CSS v4 |
| **AI Threat Intelligence** | Google AI Studio (Gemini 3.5 Flash) |
| **Database & Auth** | Supabase (PostgreSQL, Row Level Security, Auth Admin) |
| **Icons & Effects** | Lucide React, Canvas Confetti |
| **Deployment** | Vercel |

---

## 🚀 Getting Started Locally

### 1. Clone the repository
```bash
git clone https://github.com/Limitha1/ScamLens-AI.git
cd ScamLens-AI
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Create a `.env` file in the root directory (based on `.env.example`):
```env
# Google AI Studio Gemini API Key
VITE_GEMINI_API_KEY=your_gemini_api_key

# Supabase Configuration
VITE_SUPABASE_URL=https://kbucpedcafmpaaudqyen.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### 4. Run the development server
```bash
npm run dev
```
Open [http://localhost:5173/](http://localhost:5173/) in your browser.

---

## 👥 Team FourSight
- Developed for **Code Meet '26**
- Autonomous Verification & Threat Engine by **Limitha M**
