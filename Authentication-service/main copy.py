import firebase_admin
from firebase_admin import auth, credentials, firestore
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from firebase_admin.auth import UserNotFoundError
from models import RegisterRequest, LoginRequest, TokenRequest, SetPasswordRequest
import bcrypt

# Initialize the app with a service account
cred = credentials.Certificate("./newshub-97e29-firebase-adminsdk-kn7x6-4fba892b01.json")
firebase_admin.initialize_app(cred)

# Initialize Firestore
db = firestore.client()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this to your frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/register")
async def register_user(register_data: RegisterRequest):
    try:
        # Create a user with email and password in Firebase Auth
        user = auth.create_user(
            email=register_data.email,
            password=register_data.password,
            display_name=register_data.username
        )

         # Hash the password before storing
        hashed_password = bcrypt.hashpw(register_data.password.encode('utf-8'), bcrypt.gensalt())
        
        # Check if the 'users' collection exists and insert the user document
        user_data = {
            "email": register_data.email,
            'password': hashed_password.decode('utf-8'),
            "username": register_data.username,
            "uid": user.uid,
            "created_at": firestore.SERVER_TIMESTAMP
        }
        
        # Add the new user to the 'users' collection
        db.collection('users').document(user.uid).set(user_data)
        
        return {"msg": "User registered successfully", "uid": user.uid}

    except firebase_admin.auth.EmailAlreadyExistsError:
        raise HTTPException(status_code=400, detail="Email is already in use")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/login")
async def login_user(login_data: LoginRequest):
    try:
        # Fetch the user document from Firestore
        user_ref = db.collection("users").document(auth.get_user_by_email(login_data.email).uid)
        user_doc = user_ref.get()

        if not user_doc.exists:
            raise HTTPException(status_code=400, detail="Invalid email or password")

        user_data = user_doc.to_dict()

        # Verify the password
        if bcrypt.checkpw(login_data.password.encode('utf-8'), user_data['password'].encode('utf-8')):
            # Here, you could generate and return a Firebase ID token if needed
            return {"msg": "Login successful", "email": user_data['email']}
        else:
            raise HTTPException(status_code=400, detail="Invalid email or password")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
# Route to verify Google Sign-In token
@app.post("/auth/verify-token")
async def verify_token(token_data: TokenRequest):
    try:
        # Verify the token using Firebase Admin SDK
        decoded_token = auth.verify_id_token(token_data.token)
        uid = decoded_token['uid']
        email = decoded_token['email']
        
        # Reference to the users collection in Firestore
        user_ref = db.collection("users").document(uid)

        # Check if user exists in Firestore
        user_doc = user_ref.get()

        if not user_doc.exists:
            # If user does not exist, register them in Firestore
            user_ref.set({
                "email": email,
                "username": email.split("@")[0],  # Use email prefix as username or handle it accordingly
                "sign_in_method": "google",
                "uid": uid,
                "setted_password": False,  # Mark that password is not set yet
                "created_at": firestore.SERVER_TIMESTAMP  # Optionally store the timestamp
            })
            return {"msg": "Token is valid", "uid": uid, "email": email, "setted_password": False}
        else:
            # User exists, check if they have set a password
            user_data = user_doc.to_dict()
            return {
                "msg": "Token is valid",
                "uid": uid,
                "email": email,
                "setted_password": user_data.get("setted_password", False)  # Default to False if field is missing
            }

    except Exception as e:
        raise HTTPException(status_code=401, detail="Invalid token or other error: " + str(e))


@app.post("/auth/set-password")
async def set_password(set_password_data: SetPasswordRequest):
    try:
        # Fetch user by email
        user_ref = db.collection("users").document(auth.get_user_by_email(set_password_data.email).uid)
        user_doc = user_ref.get()

        if not user_doc.exists:
            raise HTTPException(status_code=404, detail="User not found")

        user_data = user_doc.to_dict()

        # Hash and store the new password
        hashed_password = bcrypt.hashpw(set_password_data.password.encode('utf-8'), bcrypt.gensalt())
        user_data['password'] = hashed_password.decode('utf-8')  # Store the hashed password
        user_data['setted_password'] = True

        # Update user record in Firestore
        user_ref.update(user_data)

        return {"msg": "Password set successfully"}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/reset-password")
async def reset_password(email: str):
    try:
        auth.generate_password_reset_link(email)
        return {"msg": "Password reset link sent to email"}

    except UserNotFoundError:
        raise HTTPException(status_code=400, detail="Email not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

