# SkillSynq

SkillSynq is a premium AI-powered resume and job compatibility analyzer. It evaluates a user's resume against a job description, calculates a similarity match score, and provides actionable insights and skill gaps using advanced NLP techniques.

## Technology Stack
- **Frontend:** React.js (Vite), Tailwind CSS, Framer Motion
- **Backend:** Node.js, Express.js, Multer
- **AI Microservice:** Python, FastAPI, spaCy, scikit-learn (TF-IDF, Cosine Similarity)

## Folder Structure
- `/frontend` - React User Interface
- `/backend` - Node.js Express API & File Upload Handler
- `/ai-service` - Python NLP Engine

## How to Run Locally

### 1. Python AI Service
Provide the NLP capabilities.
```bash
cd ai-service
pip install -r requirements.txt
python -m spacy download en_core_web_sm
python app.py
```
*Runs on `http://localhost:8000`*

### 2. Node.js Backend
Handles file uploads and acts as a proxy to the AI service.
```bash
cd backend
npm install
node server.js
```
*Runs on `http://localhost:5000`*

### 3. React Frontend
The User Interface.
```bash
cd frontend
npm install
npm run dev
```
*Runs on `http://localhost:5173`*

## Features
- **Smart Parsing:** Extract text from PDFs and Images.
- **Match Score:** Calculates a cosine similarity match score.
- **Keyword Analysis:** Extracts Matched and Missing Skills.
- **Premium UI:** Glassmorphism, particles, smooth hover animations.
