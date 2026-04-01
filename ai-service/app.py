from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import shutil
import os
from resume_analyzer import process_resume
from text_extractor import extract_text

app = FastAPI(title="SkillSynq AI Service")

# Allow Node.js Backend to communicate
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@app.get("/health")
def health_check():
    return {"status": "OK", "message": "Python AI microservice running."}

@app.post("/api/analyze")
async def analyze_resume(
    resume: UploadFile = File(...),
    jobDescription: str = Form(...)
):
    try:
        # Save uploaded file temporarily
        file_path = os.path.join(UPLOAD_DIR, resume.filename)
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(resume.file, buffer)

        # 1. Extract Text
        resume_text = extract_text(file_path)

        if not resume_text.strip():
            raise HTTPException(status_code=400, detail="Could not extract text from the provided file.")

        # 2. Process Resume vs Job Description (NLP logic)
        results = process_resume(resume_text, jobDescription)

        # 3. Clean up temporary file
        os.remove(file_path)

        return results

    except Exception as e:
        print(f"Error in analyze_resume: {str(e)}")
        if os.path.exists(file_path):
             os.remove(file_path)
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)
