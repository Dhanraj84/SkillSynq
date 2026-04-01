import re
from skill_library import ALL_TECH_SKILLS


# -----------------------------
# CLEAN TEXT FUNCTION
# -----------------------------

def clean_text(text):

    if not text:
        return ""

    text = text.lower()

    # remove special characters
    text = re.sub(r"[^a-z0-9+#.\s]", " ", text)

    return text


# -----------------------------
# SKILL EXTRACTION FUNCTION
# -----------------------------

def extract_skills(text):

    text = clean_text(text)

    detected_skills = set()

    for skill in ALL_TECH_SKILLS:

        # create regex pattern
        pattern = r"\b" + re.escape(skill.lower()) + r"\b"

        if re.search(pattern, text):
            detected_skills.add(skill.lower())

    return list(detected_skills)


# -----------------------------
# TECH PHRASES (IMPORTANT)
# -----------------------------

TECH_PHRASES = [
    "machine learning",
    "deep learning",
    "data science",
    "web development",
    "cloud computing",
    "software engineering",
    "natural language processing",
    "computer vision",
    "microservices architecture",
    "object oriented programming",
    "data structures",
    "distributed systems",
]


# -----------------------------
# PHRASE DETECTION
# -----------------------------

def extract_phrases(text):

    text = clean_text(text)

    detected_phrases = set()

    for phrase in TECH_PHRASES:

        pattern = r"\b" + re.escape(phrase.lower()) + r"\b"

        if re.search(pattern, text):
            detected_phrases.add(phrase)

    return list(detected_phrases)


# -----------------------------
# MASTER FUNCTION
# -----------------------------

def extract_all_skills(text):

    skills = extract_skills(text)
    phrases = extract_phrases(text)

    return list(set(skills + phrases))