import { CreateOrderParams, PaymentGatewayAdapter, PaymentOrderResult, VerifyWebhookResult } from "./adapter";

export class SandboxPaymentGateway implements PaymentGatewayAdapter {
  async createOrder(params: CreateOrderParams): Promise<PaymentOrderResult> {
    const orderId = `ORD-SANDBOX-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    return {
      orderId,
      gateway: "sandbox",
      amount: params.amount,
      currency: params.currency,
      checkoutUrl: `/membership?order=${orderId}&token=tok_sandbox_${Date.now()}`,
      token: `tok_sandbox_${Date.now()}`,
    };
  }

  async verifyWebhook(
    payload: Record<string, unknown>,
    signature: string
  ): Promise<VerifyWebhookResult> {
    // In sandbox test mode, verify that signature matches expected prefix or valid secret
    const isValid = signature.startsWith("sig_sandbox_") || signature === "sandbox_secret_key_wildlife_atlas";

    return {
      verified: isValid,
      orderId: (payload.orderId as string) || `ORD-SANDBOX-${Date.now()}`,
      transactionId: (payload.transactionId as string) || `TXN-SANDBOX-${Date.now()}`,
      userId: (payload.userId as string) || "usr_anonymous",
      amount: Number(payload.amount) || 30,
      currency: (payload.currency as "INR" | "USD") || "INR",
      status: isValid ? "verified" : "failed",
    };
  }
}

export const paymentGateway = new SandboxPaymentGateway();

