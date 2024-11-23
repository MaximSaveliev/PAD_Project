import firebase_admin
from firebase_admin import auth, credentials, firestore
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from firebase_admin.auth import UserNotFoundError
from models import *
from datetime import datetime
import bcrypt

# Initialize Firebase and FastAPI as before
cred = credentials.Certificate("./newshub-97e29-firebase-adminsdk-kn7x6-4fba892b01.json")
print(cred)
firebase_admin.initialize_app(cred)
db = firestore.client()
app = FastAPI(
    title="NewsHub API",
    description="This API for Auth service",
    version="1.0.0",
)

# CORS middleware setup as before
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/register", tags=["Users"])
async def register_user(register_data: RegisterRequest):
    try:
        # Create user in Firebase Auth
        user = auth.create_user(
            email=register_data.email,
            password=register_data.password,
            display_name=f"{register_data.firstName} {register_data.lastName}"
        )

        # Hash password
        hashed_password = bcrypt.hashpw(register_data.password.encode('utf-8'), bcrypt.gensalt())
        
        # Create enhanced user data
        user_data = {
            "email": register_data.email,
            "password": hashed_password.decode('utf-8'),
            "firstName": register_data.firstName,
            "lastName": register_data.lastName,
            "role": "user",  # Default role
            "plan": "basic",  # Default plan
            "preferredTopics": register_data.preferredTopics,
            "uid": user.uid,
            "dateJoined": datetime.now().isoformat(),
            "lastLogin": datetime.now().isoformat(),
            "setted_password": True
        }
        
        # Store in Firestore
        db.collection('users').document(user.uid).set(user_data)
        
        return {"msg": "User registered successfully", "uid": user.uid, "user": user_data}

    except firebase_admin.auth.EmailAlreadyExistsError:
        raise HTTPException(status_code=400, detail="Email is already in use")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/login", tags=["Users"])
async def login_user(login_data: LoginRequest):
    try:
        # Fetch user from Firestore
        firebase_user = auth.get_user_by_email(login_data.email)
        user_ref = db.collection("users").document(firebase_user.uid)
        user_doc = user_ref.get()

        if not user_doc.exists:
            raise HTTPException(status_code=400, detail="Invalid email or password")

        user_data = user_doc.to_dict()

        # Verify password
        if bcrypt.checkpw(login_data.password.encode('utf-8'), user_data['password'].encode('utf-8')):
            # Update last login
            user_ref.update({"lastLogin": datetime.now().isoformat()})
            
            # Return user data in the specified format
            return {
                "msg": "Login successful",
                "user": {
                    "id": firebase_user.uid,
                    "firstName": user_data.get('firstName', ''),
                    "lastName": user_data.get('lastName', ''),
                    "role": user_data.get('role', 'user'),
                    "plan": user_data.get('plan', 'basic'),
                    "preferredTopics": user_data.get('preferredTopics', []),
                    "email": user_data['email'],
                    "dateJoined": user_data.get('dateJoined', ''),
                    "lastLogin": datetime.now().isoformat()
                }
            }
        else:
            raise HTTPException(status_code=400, detail="Invalid email or password")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/auth/verify-token", tags=["Token verification"])
async def verify_token(token_data: TokenRequest):
    try:
        decoded_token = auth.verify_id_token(token_data.token)
        uid = decoded_token['uid']
        email = decoded_token['email']
        
        user_ref = db.collection("users").document(uid)
        user_doc = user_ref.get()

        if not user_doc.exists:
            # Create new user from Google sign-in
            user_data = {
                "email": email,
                "firstName": token_data.userData.get('firstName', '') if token_data.userData else '',
                "lastName": token_data.userData.get('lastName', '') if token_data.userData else '',
                "role": "user",
                "plan": "basic",
                "preferredTopics": token_data.userData.get('preferredTopics', []) if token_data.userData else [],
                "uid": uid,
                "dateJoined": datetime.now().isoformat(),
                "lastLogin": datetime.now().isoformat(),
                "setted_password": False
            }
            user_ref.set(user_data)
            return {"msg": "Token is valid", "uid": uid, "email": email, "setted_password": False, "user": user_data}
        else:
            user_data = user_doc.to_dict()
            # Update last login
            user_ref.update({"lastLogin": datetime.now().isoformat()})
            return {
                "msg": "Token is valid",
                "uid": uid,
                "email": email,
                "setted_password": user_data.get("setted_password", False),
                "user": {
                    "id": uid,
                    "firstName": user_data.get('firstName', ''),
                    "lastName": user_data.get('lastName', ''),
                    "role": user_data.get('role', 'user'),
                    "plan": user_data.get('plan', 'basic'),
                    "preferredTopics": user_data.get('preferredTopics', []),
                    "email": email,
                    "dateJoined": user_data.get('dateJoined', ''),
                    "lastLogin": datetime.now().isoformat()
                }
            }

    except Exception as e:
        raise HTTPException(status_code=401, detail="Invalid token or other error: " + str(e))

@app.post("/auth/set-password", tags=["Password"])
async def set_password(set_password_data: SetPasswordRequest):
    try:
        firebase_user = auth.get_user_by_email(set_password_data.email)
        user_ref = db.collection("users").document(firebase_user.uid)
        user_doc = user_ref.get()

        if not user_doc.exists:
            raise HTTPException(status_code=404, detail="User not found")

        user_data = user_doc.to_dict()

        # Hash and update password
        hashed_password = bcrypt.hashpw(set_password_data.password.encode('utf-8'), bcrypt.gensalt())
        updates = {
            'password': hashed_password.decode('utf-8'),
            'setted_password': True,
            'lastLogin': datetime.now().isoformat()
        }
        user_ref.update(updates)

        return {
            "msg": "Password set successfully",
            "user": {
                "id": firebase_user.uid,
                "firstName": user_data.get('firstName', ''),
                "lastName": user_data.get('lastName', ''),
                "role": user_data.get('role', 'user'),
                "plan": user_data.get('plan', 'basic'),
                "preferredTopics": user_data.get('preferredTopics', []),
                "email": user_data['email'],
                "dateJoined": user_data.get('dateJoined', ''),
                "lastLogin": datetime.now().isoformat()
            }
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Reset password endpoint remains the same
@app.post("/reset-password", tags=["Password"])
async def reset_password(email: str):
    try:
        auth.generate_password_reset_link(email)
        return {"msg": "Password reset link sent to email"}
    except UserNotFoundError:
        raise HTTPException(status_code=400, detail="Email not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))