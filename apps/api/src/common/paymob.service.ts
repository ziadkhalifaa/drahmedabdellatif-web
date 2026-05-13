import { Injectable, Logger } from '@nestjs/common';

/**
 * Paymob Payment Service
 * 
 * Configuration Required (add to .env):
 *   PAYMOB_API_KEY=your_api_key
 *   PAYMOB_INTEGRATION_ID=your_integration_id
 *   PAYMOB_IFRAME_ID=your_iframe_id
 *   PAYMOB_HMAC_SECRET=your_hmac_secret
 */
@Injectable()
export class PaymobService {
  private readonly logger = new Logger(PaymobService.name);

  private readonly apiKey = process.env.PAYMOB_API_KEY;
  private readonly integrationId = process.env.PAYMOB_INTEGRATION_ID;
  private readonly iframeId = process.env.PAYMOB_IFRAME_ID;

  /**
   * Step 1: Authenticate with Paymob
   */
  async authenticate(): Promise<string> {
    const res = await fetch('https://accept.paymob.com/api/auth/tokens', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ api_key: this.apiKey }),
    });

    if (!res.ok) throw new Error('Paymob authentication failed');
    const data: any = await res.json();
    return data.token;
  }

  /**
   * Step 2: Create an order
   */
  async createOrder(authToken: string, amountCents: number, items: any[] = []) {
    const res = await fetch('https://accept.paymob.com/api/ecommerce/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        auth_token: authToken,
        delivery_needed: false,
        amount_cents: amountCents,
        currency: 'EGP',
        items,
      }),
    });

    if (!res.ok) throw new Error('Paymob order creation failed');
    return res.json();
  }

  /**
   * Step 3: Get payment key (for iframe)
   */
  async getPaymentKey(
    authToken: string,
    orderId: string,
    amountCents: number,
    billingData: any,
  ): Promise<string> {
    const res = await fetch('https://accept.paymob.com/api/acceptance/payment_keys', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        auth_token: authToken,
        amount_cents: amountCents,
        expiration: 3600,
        order_id: orderId,
        billing_data: {
          first_name: billingData.firstName || 'NA',
          last_name: billingData.lastName || 'NA',
          email: billingData.email || 'NA',
          phone_number: billingData.phone || 'NA',
          apartment: 'NA',
          floor: 'NA',
          street: 'NA',
          building: 'NA',
          shipping_method: 'NA',
          postal_code: 'NA',
          city: 'NA',
          country: 'EG',
          state: 'NA',
        },
        currency: 'EGP',
        integration_id: Number(this.integrationId),
      }),
    });

    if (!res.ok) throw new Error('Paymob payment key failed');
    const data: any = await res.json();
    return data.token;
  }

  /**
   * Full flow: initiates a payment and returns the iframe URL
   */
  async initiatePayment(
    amountCents: number,
    billingData: { firstName: string; lastName: string; email: string; phone: string },
    items: any[] = [],
  ): Promise<{ iframeUrl: string; orderId: string }> {
    this.logger.log(`Initiating Paymob payment: ${amountCents / 100} EGP`);

    const authToken = await this.authenticate();
    const order = await this.createOrder(authToken, amountCents, items);
    const paymentKey = await this.getPaymentKey(authToken, order.id, amountCents, billingData);

    return {
      iframeUrl: `https://accept.paymob.com/api/acceptance/iframes/${this.iframeId}?payment_token=${paymentKey}`,
      orderId: String(order.id),
    };
  }

  /**
   * Validate HMAC from Paymob webhook/callback
   */
  validateHmac(data: Record<string, any>, receivedHmac: string): boolean {
    const crypto = require('crypto');
    const hmacSecret = process.env.PAYMOB_HMAC_SECRET;
    if (!hmacSecret) return false;

    // Concatenate the required fields in the Paymob HMAC order
    const hmacFields = [
      'amount_cents', 'created_at', 'currency', 'error_occured',
      'has_parent_transaction', 'id', 'integration_id', 'is_3d_secure',
      'is_auth', 'is_capture', 'is_refunded', 'is_standalone_payment',
      'is_voided', 'order', 'owner', 'pending',
      'source_data.pan', 'source_data.sub_type', 'source_data.type', 'success',
    ];

    const concatenated = hmacFields.map(f => {
      const keys = f.split('.');
      let val = data;
      for (const k of keys) val = val?.[k];
      return String(val ?? '');
    }).join('');

    const computed = crypto
      .createHmac('sha512', hmacSecret)
      .update(concatenated)
      .digest('hex');

    return computed === receivedHmac;
  }
}
