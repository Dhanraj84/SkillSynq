<div align="center">
  <h1>🚀 SkillSynq</h1>
  <p><b>Premium AI-Powered Resume & Job Compatibility Analyzer</b></p>
  <br />
</div>

## 📌 Overview

**SkillSynq** is an advanced AI-driven application designed to bridge the gap between job seekers and employers. 
By evaluating a user's resume against a specific job description, SkillSynq intelligently calculates a similarity match score, extracts relevant skills, and identifies crucial skill gaps using cutting-edge Natural Language Processing (NLP) techniques.

With a sleek, premium User Interface and a robust microservices architecture, SkillSynq provides real-time, actionable insights to help professionals optimize their resumes.

---

## ✨ Key Features

- 🧠 **Smart NLP Parsing:** Accurately extracts text and contexts from uploaded resumes.
- 🎯 **Match Score Generation:** Computes a cosine similarity score to determine how well a resume fits a job role.
- 🔍 **Keyword Analysis:** Rapidly identifies **Matched Skills** and **Missing Skills** crucial for ATS optimization.
- 🎨 **Premium UI/UX:** Built with glassmorphism aesthetics, interactive particles, and smooth Framer Motion hover animations.
- ⚡ **Microservices Architecture:** Scalable separation of frontend, backend, and the core AI engine.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| --- | --- |
| **Frontend** | React.js (Vite), Tailwind CSS, Framer Motion, Lucide React |
| **Backend** | Node.js, Express.js, Multer (File Uploads), Axios |
| **AI Microservice** | Python, FastAPI, spaCy, scikit-learn (TF-IDF, Cosine Similarity) |

---

## 📂 Folder Structure

```
SkillSynq/
│
├── frontend/       # React (Vite) User Interface
├── backend/        # Node.js Express API & File Upload Handler
└── ai-service/     # Python NLP & Machine Learning Engine
```

---

## 🚀 Getting Started

Follow the steps below to run SkillSynq locally on your machine.

### 1️⃣ Run the Python AI Service (NLP Engine)
This service handles the core NLP capabilities, matching logic, and similarity calculations.

```bash
cd ai-service

# Install dependencies
pip install -r requirements.txt

# Download the required spaCy model
python -m spacy download en_core_web_sm

# Start the FastAPI server
python app.py
```
> **Note:** Runs by default on `http://localhost:8000`

### 2️⃣ Run the Node.js Backend API
This service handles file uploads (resumes) and acts as an efficient proxy connecting the frontend to the AI service.

```bash
cd backend

# Install Node modules
npm install

# Start the Express server
node server.js
```
> **Note:** Runs by default on `http://localhost:5000`

### 3️⃣ Run the React Frontend
This is the beautiful, interactive User Interface where users upload their resumes and view analysis results.

```bash
cd frontend

# Install Node modules
npm install

# Start the Vite development server
npm run dev
```
> **Note:** Runs by default on `http://localhost:5173`

---

## 💡 How It Works

1. **Upload Phase:** User inputs the target Job Description and uploads their Resume.
2. **Backend Processing:** Node.js securely receives the upload and forwards the raw text data to the AI microservice.
3. **AI Analysis:** The Python engine cleans the text, vectorizes it using TF-IDF, calculates Cosine Similarity, and runs Named Entity Recognition (NER) to extract skills.
4. **Results:** The React frontend beautifully renders the overall compatibility score, along with actionable insights on missing skill gaps.

---

<div align="center">
  <p>Built with ❤️ by the SkillSynq Team</p>
</div>

