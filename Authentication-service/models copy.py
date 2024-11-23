from pydantic import BaseModel

class RegisterRequest(BaseModel):
    email: str
    password: str
    username: str = None  # Optional

class LoginRequest(BaseModel):
    email: str
    password: str

class TokenRequest(BaseModel):
    token: str

class SetPasswordRequest(BaseModel):
    email: str
    password: str