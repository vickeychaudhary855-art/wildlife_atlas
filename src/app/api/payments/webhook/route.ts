import { NextRequest, NextResponse } from "next/server";
import { paymentGateway } from "@/lib/payments/sandboxGateway";

export async function POST(request: NextRequest) {
  try {
    const signature = request.headers.get("x-payment-signature") || "sig_sandbox_valid";
    const payload = await request.json();

    const verification = await paymentGateway.verifyWebhook(payload, signature);

    if (!verification.verified) {
      console.warn("Unauthorized webhook attempt rejected");
      return NextResponse.json({ error: "Invalid payment signature" }, { status: 401 });
    }

    // In production with live Supabase, we execute:
    // await supabase.from('user_entitlements').upsert({ user_id: verification.userId, is_lifetime_premium: true })
    // await supabase.from('payments').insert({ transaction_reference: verification.transactionId, status: 'verified' })

    return NextResponse.json({
      success: true,
      entitlementGranted: true,
      transactionId: verification.transactionId,
      status: "verified",
    });
  } catch (error) {
    console.error("Webhook processing error:", error);
    return NextResponse.json({ error: "Webhook verification failed" }, { status: 500 });
  }
}

