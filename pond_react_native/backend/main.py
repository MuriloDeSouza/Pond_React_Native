from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import uvicorn
import random
import time
from routes.otp import OPT, EmailModel, OTPModel, ResetModel

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


otp_service = OPT() 

@app.post("/send-otp")
def send_otp(data: EmailModel):
    return otp_service.send_otp(data)

@app.post("/verify-otp")
def verify_otp(data: OTPModel):
    return otp_service.verify_otp(data)

@app.post("/reset-password")
def reset_password(data: ResetModel):
    return otp_service.reset_password(data)

if __name__ == "__main__":  
    uvicorn.run(app, host="0.0.0.0", port=8000)