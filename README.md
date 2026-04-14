# ⚡ SkillSynq – Premium AI-Powered Resume & Job Compatibility Analyzer

[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-20-339933?style=for-the-badge&logo=nodedotjs)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-5-000000?style=for-the-badge&logo=express)](https://expressjs.com/)
[![Python](https://img.shields.io/badge/Python-3.10+-3776AB?style=for-the-badge&logo=python)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-009688?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com/)
[![Scikit-Learn](https://img.shields.io/badge/Scikit--Learn-1.3-F7931E?style=for-the-badge&logo=scikit-learn)](https://scikit-learn.org/)
[![spaCy](https://img.shields.io/badge/spaCy-3-09A3D5?style=for-the-badge&logo=spacy)](https://spacy.io/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-black?style=for-the-badge&logo=framer)](https://www.framer.com/motion/)

SkillSynq is an advanced, high-performance platform designed to revolutionize the hiring process. It bridges the gap between job seekers and employers by evaluating a user's resume against a specific job description, providing precise AI-backed compatibility scores and actionable skill insights.

---

## 📸 Project Showcase

### 🔍 Smart Resume Parsing
Instantly extracts core text and contextual data from your uploaded resume.


### 🎯 Job Compatibility Matcher
Calculates a precise, data-driven similarity score to determine how well your profile fits the role.


### 🧠 AI Skill Gap Analysis
Identifies the exact matched skills and highlights crucial missing skills needed to bypass the ATS.


---

## 🚀 What Problem Does It Solve?

In today's competitive job market, getting past the Applicant Tracking System (ATS) is the biggest hurdle. SkillSynq bridges this gap:

- **For Job Seekers**: Eliminates the "resume black hole" by providing transparent, actionable insights on what skills are missing to match a target job.
- **For Recruiters**: Replaces manual filtering with intelligent, semantic-based ranking of candidates against job descriptions.
- **For Career Coaches**: Provides a data-backed tool to guide professionals in upskilling and tailoring their resumes effectively.

---

## ✨ Core Features

### 1. Smart AI Parsing
- **Format Flexibility**: Seamlessly extracts and cleans raw text from user-uploaded resumes.
- **Contextual Understanding**: Prepares text for deep NLP processing.

### 2. Intelligent Scoring Engine
- **TF-IDF & Cosine Similarity**: Employs advanced machine learning algorithms to compute a precise similarity score between the resume and the job description.
- **ATS Simulation**: Mimics enterprise applicant tracking systems to gauge real-world chances.

### 3. Keyword Analysis & Intelligence
- **Named Entity Recognition (NER)**: Uses NLP (spaCy) to intelligently identify professional skills from dense text.
- **Gap Visualization**: Clearly contrasts **Matched Skills** against **Missing Skills** crucial for optimization.

### 4. Premium User Experience
- **Glassmorphism UI**: Uses beautiful, modern aesthetic principles for a premium feel.
- **Micro-Animations**: Features smooth, responsive Framer Motion animations across all user interactions.

---

## 🛠 Tech Stack

### Frontend & UI
- **Framework**: [React.js](https://reactjs.org/) (via Vite)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)

### Backend Node API
- **Runtime**: [Node.js](https://nodejs.org/) with Express.js
- **File Handling**: Multer for secure parse streams
- **Network**: Axios for efficient proxying 

### ML & AI Service
- **API Framework**: [FastAPI](https://fastapi.tiangolo.com/)
- **Machine Learning**: Scikit-learn (TF-IDF Vectorization, Cosine Similarity)
- **Natural Language Processing**: spaCy (NER processing)

---

## 🏗️ Architecture Overview

- **Frontend (React/Vite)**: High-performance, aesthetic UI and interaction rendering.
- **Backend (Node.js/Express)**: Secure file upload handler and proxy routing server.
- **ML Engine (Python/FastAPI)**: Specialized, asynchronous AI prediction and NLP engine processing.

---
 
 ## ⚙️ Getting Started
 
 ### Prerequisites
 - **Node.js**: v18 or higher
 - **Python**: v3.10 or higher
 - **Package Manager**: npm or yarn
 
 ### Installation

 1. **AI Service (Python Engine)**
    This service handles the core NLP capabilities.
    ```bash
    cd ai-service
    pip install -r requirements.txt
    python -m spacy download en_core_web_sm
    python app.py
    ```
    *Runs on http://localhost:8000*
 
 2. **Backend API (Node.js)**
    This service handles uploads and forwards them securely.
    ```bash
    cd backend
    npm install
    node server.js
    ```
    *Runs on http://localhost:5000*

 3. **Frontend Dashboard (React)**
    The beautiful user interface.
    ```bash
    cd frontend
    npm install
    npm run dev
    ```
    *Open [http://localhost:5173](http://localhost:5173) to view the application.*

---

## 🔮 Future Improvements

- **AI Cover Letter Generator**: Automatically draft tailored cover letters based on the matched skills.
- **Direct LinkedIn Import**: Fetch user profile data directly without uploading a PDF.
- **Generative AI Feedback**: Provide natural language suggestions on how to rephrase bullet points for maximum impact.
- **Employer Dashboard**: A dedicated view for recruiters to batch-upload and rank multiple resumes against a single job description.

---

## 👨‍💻 Author

**Dhanraj Kumar**  
*Passionate about building practical AI solutions.*

---

## 📊 Real-World Impact
SkillSynq aims to contribute to **Fairer Hiring Practices**, **Data-Driven Career Development**, and **Eliminating Resume Rejection Bias**. Join us in shaping the future of intelligent recruitment! 🚀
