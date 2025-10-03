export const handlePayment = async () => {
  const response = await fetch("http://localhost:8000/payments/create-order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ amount: 120, currency: "INR" }),
  });

  const data = await response.json();
  if (data.error) {
    alert(data.error);
    return;
  }

  const options = {
    key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    amount: data.amount * 100,
    currency: data.currency,
    name: "Horizon",
    description: "Paid Tier Subscription",
    order_id: data.order_id,
    handler: function (response: any) {
      alert(response.razorpay_payment_id);
      alert(response.razorpay_order_id);
      alert(response.razorpay_signature);
    },
    prefill: {
      name: "Test User",
      email: "test.user@example.com",
      contact: "9999999999",
    },
    notes: {
      address: "Razorpay Corporate Office",
    },
    theme: {
      color: "#FF0080",
    },
  };

  const rzp = new (window as any).Razorpay(options);
  rzp.open();
};
