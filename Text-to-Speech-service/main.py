from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from elevenlabs.client import ElevenLabs
from elevenlabs import save
import base64
import os
import firebase_admin
from firebase_admin import credentials, firestore

# Firebase Admin Initialization
cred = credentials.Certificate("newshub-articles-firebase-adminsdk-8ndx9-c3b042bb32.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

# ElevenLabs TTS Client
client = ElevenLabs(
    api_key="sk_e8a40bfcbf01a3803e75ef0fbb8839e4ff49e8781214ae8f"
)

# Initialize FastAPI app
app = FastAPI()

# Request model
class ArticleIdRequest(BaseModel):
    article_id: str

@app.post("/generate-tts/")
async def generate_tts(request: ArticleIdRequest):
    article_id = request.article_id

    try:
        # Fetch article from Firestore 'cnn_news' collection
        doc_ref = db.collection("cnn_news").document(article_id)
        doc = doc_ref.get()
        if not doc.exists:
            raise HTTPException(status_code=404, detail="Article not found")

        article = doc.to_dict()

        # Extract the preview text
        preview_text = article.get("preview")
        if not preview_text:
            raise HTTPException(status_code=400, detail="Preview text is missing")

        # Generate TTS audio
        audio = client.generate(
            text=preview_text,
            voice="bIHbv24MWmeRgasZH58o",  # Specify voice ID
            model="eleven_multilingual_v2"
        )
        
        # Save audio temporarily
        temp_audio_path = "temp_audio.mp3"
        save(audio, temp_audio_path)

        # Convert audio to base64
        with open(temp_audio_path, "rb") as audio_file:
            audio_base64 = base64.b64encode(audio_file.read()).decode("utf-8")

        # Clean up the temporary audio file
        os.remove(temp_audio_path)

        # Update the article in Firestore
        doc_ref.update({"tts_uid": audio_base64})

        return JSONResponse(content={"message": "TTS generated successfully", "tts_uid": audio_base64})
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing request: {str(e)}")
