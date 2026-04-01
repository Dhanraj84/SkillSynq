import fitz
import pytesseract
from PIL import Image
import os


def extract_text_from_pdf(file_path):

    text = ""

    try:
        doc = fitz.open(file_path)

        for page in doc:
            page_text = page.get_text("text")

            if page_text.strip():
                text += page_text + "\n"
            else:
                pix = page.get_pixmap()
                img = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
                text += pytesseract.image_to_string(img)

    except Exception as e:
        print("PDF extraction error:", e)

    return text


def extract_text(file_path):

    ext = os.path.splitext(file_path)[1].lower()

    if ext == ".pdf":
        return extract_text_from_pdf(file_path)

    return ""