import firebase_admin
from firebase_admin import credentials, firestore

class FirebasePipeline:
    def __init__(self):
        # Initialize Firebase
        cred = credentials.Certificate("newshub-articles-firebase-adminsdk-8ndx9-c3b042bb32.json")
        firebase_admin.initialize_app(cred)
        self.db = firestore.client()

    def process_item(self, item, spider):
        collection = f"{item['provider'].lower()}_news"
        
        doc_ref = self.db.collection(collection).document()

        # Document structure
        doc_data = {
            'article': item.get('article', ""),
            'preview': item.get('preview', ""),
            'headline': item.get('headline', ""),
            'lastModifiedDate': item.get('lastModifiedDate', ""),
            'provider': item.get('provider', ""),
            'provider_logo': item.get('provider_logo', ""),
            'thumbnail': item.get('thumbnail', ""),
            'topic': item.get('topic', ""),
            'url': item.get('url', ""),
            'created': item.get('created', ""),
            'author': item.get('author', ""),
            'tts_uid': item.get('tts_uid', ""),
        }

        # Write to Firestore
        doc_ref.set(doc_data)
        return item
