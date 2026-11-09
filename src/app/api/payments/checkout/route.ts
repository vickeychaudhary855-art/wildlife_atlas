import { NextRequest, NextResponse } from "next/server";
import { paymentGateway } from "@/lib/payments/sandboxGateway";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, email, currency } = body;

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const selectedCurrency = currency === "USD" ? "USD" : "INR";
    const amount = selectedCurrency === "USD" ? 1 : 30; // ₹30 INR or $1 USD

    const order = await paymentGateway.createOrder({
      userId: userId || "usr_guest",
      email,
      currency: selectedCurrency,
      amount,
    });

    return NextResponse.json(order);
  } catch (error) {
    console.error("Error creating payment order:", error);
    return NextResponse.json({ error: "Failed to initialize payment order" }, { status: 500 });
  }
}

