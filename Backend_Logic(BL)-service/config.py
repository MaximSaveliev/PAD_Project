from google.cloud import firestore
from google.oauth2 import service_account

# Path to the Firebase JSON configuration file
FIREBASE_CONFIG_FILE = "newshub-articles-firebase-adminsdk-8ndx9-c3b042bb32.json"

# Initialize Firestore with credentials
credentials = service_account.Credentials.from_service_account_file(FIREBASE_CONFIG_FILE)
db = firestore.Client(credentials=credentials)
