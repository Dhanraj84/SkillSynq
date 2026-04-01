import spacy
import re
from skill_extractor import extract_all_skills
from sklearn.metrics.pairwise import cosine_similarity
from sentence_transformers import SentenceTransformer

# ---------------- LOAD NLP MODEL ----------------

try:
    nlp = spacy.load("en_core_web_sm")
except:
    print("Warning: spaCy model not found. Install with: python -m spacy download en_core_web_sm")
    nlp = None

# ---------------- LOAD SEMANTIC MODEL ----------------

model = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")


# ---------------- TEXT PREPROCESSING ----------------

def preprocess_text(text):

    if not text:
        return ""

    text = text.lower()

    # remove special characters
    text = re.sub(r"[^a-zA-Z0-9\s]", " ", text)

    if nlp:
        doc = nlp(text)

        tokens = [
            token.lemma_
            for token in doc
            if not token.is_stop and not token.is_punct and len(token.text) > 2
        ]

        return " ".join(tokens)

    return text


# ---------------- SEMANTIC SIMILARITY ----------------

def semantic_similarity(resume_text, job_desc_text):

    embeddings = model.encode([resume_text, job_desc_text])

    similarity = cosine_similarity(
        [embeddings[0]],
        [embeddings[1]]
    )[0][0]

    return similarity * 100


# ---------------- KEYWORD EXTRACTION ----------------

def extract_keywords(text):

    if not nlp:
        return set(text.split())

    keywords = set()
    doc = nlp(text)

    for token in doc:
        if token.pos_ in ["NOUN", "PROPN"]:
            keywords.add(token.text.lower())

    return keywords


# ---------------- MAIN ANALYSIS FUNCTION ----------------

def process_resume(resume_text, job_desc_text):

    clean_resume = preprocess_text(resume_text)
    clean_jd = preprocess_text(job_desc_text)

    if not clean_resume or not clean_jd:
        return {
            "matchScore": 0,
            "matchedSkills": [],
            "missingSkills": [],
            "keywordsMatch": 0,
            "suggestions": ["Could not extract meaningful text from resume or job description."],
            "insights": "Upload a clear resume."
        }

    # ---------- Semantic Similarity ----------

    semantic_score = semantic_similarity(clean_resume, clean_jd)

    # ---------- Skill Extraction (IMPORTANT FIX) ----------

    resume_skills = extract_all_skills(resume_text)
    jd_skills = extract_all_skills(job_desc_text)

    matched_skills = list(set(resume_skills).intersection(set(jd_skills)))
missing_skills = [
skill for skill in jd_skills
if skill not in resume_skills
]
    # ---------- Skill Match Percentage ----------

    if len(jd_skills) > 0:
        skill_match_pct = (len(matched_skills) / len(jd_skills)) * 100
    else:
        skill_match_pct = 0

    # ---------- Keyword Similarity ----------

    jd_keywords = extract_keywords(job_desc_text)
    resume_keywords = extract_keywords(resume_text)

    common_keywords = jd_keywords.intersection(resume_keywords)

    if len(jd_keywords) > 0:
        keywords_match_pct = (len(common_keywords) / len(jd_keywords)) * 100
    else:
        keywords_match_pct = semantic_score

    # ---------- FINAL ATS SCORE (Improved Formula) ----------

    final_score = round(
        (semantic_score * 0.5) +
        (skill_match_pct * 0.3) +
        (keywords_match_pct * 0.2)
    )

    # ---------- Suggestions ----------

    suggestions = []

    if final_score < 50:
        suggestions.append("Your resume is missing many relevant skills from the job description.")

    if len(missing_skills) > 5:
        suggestions.append(
            f"Consider adding these skills if you have experience: {', '.join(missing_skills[:5])}"
        )

    if final_score > 80:
        suggestions.append("Great match! Your resume aligns well with this role.")

    # ---------- RETURN RESULT ----------

    return {
        "matchScore": final_score,
        "matchedSkills": matched_skills[:15],
        "missingSkills": missing_skills[:15],
        "keywordsMatch": round(skill_match_pct),
        "suggestions": suggestions,
        "insights": "AI resume analysis completed."
    }