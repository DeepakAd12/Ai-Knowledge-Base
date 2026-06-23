import fitz  # PyMuPDF 
import numpy as np
from .models import Chunk
import os
import google.generativeai as genai
from dotenv import load_dotenv


load_dotenv()

genai.configure(
    api_key=os.getenv("GEMINI_API_KEY")
)


def extract_pdf_text(pdf_path):

    doc = fitz.open(pdf_path)

    text = ""

    for page in doc:
        text += page.get_text()

    return text

def split_text(text, chunk_size=500):

    chunks = []

    for i in range(0, len(text), chunk_size):
        chunks.append(
            text[i:i + chunk_size]
        )

    return chunks

from sentence_transformers import SentenceTransformer

model = SentenceTransformer(
    "all-MiniLM-L6-v2"
)

def create_embedding(text):
    return model.encode(text).tolist()


def cosine_similarity(vec1, vec2):

    vec1 = np.array(vec1)
    vec2 = np.array(vec2)

    return np.dot(vec1, vec2) / (
        np.linalg.norm(vec1) *
        np.linalg.norm(vec2)
    )

def search_chunks(query, top_k=3):

    query_embedding = create_embedding(query)

    results = []

    chunks = Chunk.objects.exclude(
        embedding=None
    )

    for chunk in chunks:

        score = cosine_similarity(
            query_embedding,
            chunk.embedding
        )

        results.append(
            (score, chunk)
        )

    results.sort(
        key=lambda x: x[0],
        reverse=True
    )

    return results[:top_k]


def ask_gemini(question, context):

    model = genai.GenerativeModel(
        "gemini-2.5-flash"
    )

    prompt = f"""
You are helping a student prepare for interviews.

Format your answer exactly like this:

## Definition :
...

## Why It Is Used :
...

## Example :
...

Keep answers simple and concise.

Context:
{context}

Question:
{question}
"""

    try:

        response = model.generate_content(
            prompt
        )

        return response.text

    except Exception as e:

        print("Gemini Error:", e)

        return """
## Error

AI service is temporarily unavailable.

Possible reasons:
- Gemini quota exceeded
- Invalid API key
- Internet connection issue

Please try again later.
"""
def generate_flashcards(context):

    model = genai.GenerativeModel(
        "gemini-2.5-flash"
    )

    prompt = f"""
Create 5 interview flashcards.

Format:

Q: Question

A: Answer

Context:
{context}
"""

    try:

        response = model.generate_content(
            prompt
        )

        return response.text

    except Exception as e:

        print("FLASHCARD ERROR:", e)

        if "429" in str(e):

            print("FLASHCARD ERROR:", e)

            return (
                "⚠️ Gemini rate limit reached. "
                "Please wait 15 seconds and try again."
            )

    return f"Flashcard Error: {str(e)}"

def generate_summary(context):

    model = genai.GenerativeModel(
        "gemini-2.5-flash"
    )

    prompt = f"""
Summarize this document.

Rules:
- Use bullet points
- Keep it concise
- Focus on key concepts

Context:
{context}
"""

    try:

        response = model.generate_content(
            prompt
        )

        return response.text

    except Exception as e:

        print("SUMMARY ERROR:", e)

        return f"Summary Error: {str(e)}"