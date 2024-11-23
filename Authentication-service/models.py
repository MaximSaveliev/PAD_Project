from pydantic import BaseModel
from typing import List, Optional

class UserRole(str):
    USER = "user"
    ADMIN = "admin"

class UserPlan(str):
    BASIC = "basic"
    PREMIUM = "premium"

class RegisterRequest(BaseModel):
    email: str
    password: str
    firstName: str
    lastName: str
    preferredTopics: List[str] = []

class LoginRequest(BaseModel):
    email: str
    password: str

class TokenRequest(BaseModel):
    token: str
    userData: Optional[dict] = None

class SetPasswordRequest(BaseModel):
    email: str
    password: str

class UserResponse(BaseModel):
    id: str
    firstName: str
    lastName: str
    role: str
    preferredTopics: List[str]
    email: str
    dateJoined: str
    lastLogin: Optional[str] = None
