from fastapi import APIRouter
from pydantic import BaseModel
import razorpay
import os

router = APIRouter()

# Load Razorpay keys from environment variables
RAZORPAY_KEY_ID = os.getenv("RAZORPAY_KEY_ID")
RAZORPAY_KEY_SECRET = os.getenv("RAZORPAY_KEY_SECRET")

client = razorpay.Client(auth=(RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET))

class PaymentRequest(BaseModel):
    amount: int  # in rupees
    currency: str = "INR"

@router.post("/create-order")
def create_order(payment: PaymentRequest):
    try:
        # Razorpay expects amount in paise
        order_amount = payment.amount * 100
        order_currency = payment.currency
        order = client.order.create(
            dict(amount=order_amount, currency=order_currency, payment_capture="1")
        )
        return {"order_id": order["id"], "amount": payment.amount, "currency": order.currency}
    except Exception as e:
        return {"error": str(e)}
