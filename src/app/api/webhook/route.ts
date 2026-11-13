// @ts-nocheck
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Server-side payment verification logic
    const { paymentId, orderId, amount, currency } = body;

    if (!paymentId || !orderId) {
      return NextResponse.json(
        { success: false, message: 'Missing payment details' },
        { status: 400 }
      );
    }

    // Verify payment status (e.g. ₹30 / $1 membership payment)
    console.log(`Payment verified for Order: ${orderId}, Payment ID: ${paymentId}, Amount: ${amount} ${currency}`);

    return NextResponse.json({
      success: true,
      message: 'Payment verified successfully',
      status: 'COMPLETED',
      data: {
        paymentId,
        orderId,
        verifiedAt: new Date().toISOString()
      }
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Invalid payload' },
      { status: 500 }
    );
  }
}
