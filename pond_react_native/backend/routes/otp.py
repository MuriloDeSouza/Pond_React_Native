# backend/routes/otp.py

import random
import time
from fastapi import HTTPException
from pydantic import BaseModel
import smtplib
from email.message import EmailMessage
from dotenv import load_dotenv
import os


load_dotenv()  

class EmailModel(BaseModel):
    email: str

class OTPModel(BaseModel):
    email: str
    otp: str

class ResetModel(BaseModel):
    email: str
    senha: str


class OPT:
    def __init__(self):
        self.otp_storage = {}

    def send_otp(self, data: EmailModel):

        otp = str(random.randint(100000, 999999))
        self.otp_storage[data.email] = {"otp": otp, "expires": time.time() + 300}
        print(f"Enviar este código para {data.email}: {otp}")



        corpo_email = f"""
                         <p>Olá, seu código é: {otp}</p>
                      """

        msg = EmailMessage()
        msg['Subject'] = "Assunto"
        msg['From'] = os.getenv('EMAIL')
        msg['To'] = f'{data.email}'
        password = os.getenv('SENHA')
        msg.set_content(corpo_email, subtype='html')

        with smtplib.SMTP('smtp.gmail.com', 587) as s:
            s.starttls()
            s.login(msg['From'], password)
            s.send_message(msg)
            print('Email enviado')




        return {"msg": "Código enviado"}

    def verify_otp(self, data: OTPModel):
        registro = self.otp_storage.get(data.email)
        if not registro or registro['otp'] != data.otp or time.time() > registro['expires']:
            raise HTTPException(status_code=400, detail="Código inválido ou expirado")
        return {"msg": "OTP válido"}

    def reset_password(self, data: ResetModel):
        print(f"Senha do {data.email} alterada para: {data.senha}")
        return {"msg": "Senha redefinida com sucesso"}
    
    