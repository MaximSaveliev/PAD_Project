from elevenlabs import play, save
from elevenlabs.client import ElevenLabs

client = ElevenLabs(
  api_key="sk_e8a40bfcbf01a3803e75ef0fbb8839e4ff49e8781214ae8f",
)

audio = client.generate(
  text="Hello World!",
  voice="bIHbv24MWmeRgasZH58o",
#   9BWtsMINqrJLrRacOk9x Aria
#   21m00Tcm4TlvDq8ikWAM Rachel
#   bIHbv24MWmeRgasZH58o Will
  model="eleven_multilingual_v2"
)
save(audio, "audio.mp3")