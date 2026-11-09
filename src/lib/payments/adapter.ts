export interface CreateOrderParams {
  userId: string;
  email: string;
  currency: "INR" | "USD";
  amount: number; // e.g. 30 for INR, 1 for USD
}

export interface PaymentOrderResult {
  orderId: string;
  gateway: string;
  amount: number;
  currency: "INR" | "USD";
  checkoutUrl?: string;
  token?: string;
}

export interface VerifyWebhookResult {
  verified: boolean;
  orderId: string;
  transactionId: string;
  userId: string;
  amount: number;
  currency: "INR" | "USD";
  status: "verified" | "failed";
}

export interface PaymentGatewayAdapter {
  createOrder(params: CreateOrderParams): Promise<PaymentOrderResult>;
  verifyWebhook(payload: Record<string, unknown>, signature: string): Promise<VerifyWebhookResult>;
}

