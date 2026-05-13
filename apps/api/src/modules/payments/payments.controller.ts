import { Controller, Post, Body, Get, Req, UseGuards, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PaymobService } from '../../common/paymob.service';
import { PrismaService } from '../../common/prisma.service';

@Controller('payments')
export class PaymentsController {
  constructor(
    private readonly paymob: PaymobService,
    private readonly prisma: PrismaService,
  ) {}

  /**
   * Initiate a payment for an appointment
   */
  @UseGuards(AuthGuard('jwt'))
  @Post('initiate')
  async initiatePayment(
    @Req() req: any,
    @Body() body: { appointmentId: string; amount: number },
  ) {
    const user = await this.prisma.user.findUnique({ where: { id: req.user.id } });
    if (!user) throw new Error('User not found');

    const nameParts = (user.name || 'Patient').split(' ');
    const { iframeUrl, orderId } = await this.paymob.initiatePayment(
      body.amount * 100, // Convert to cents
      {
        firstName: nameParts[0] || 'Patient',
        lastName: nameParts.slice(1).join(' ') || 'NA',
        email: user.email,
        phone: user.phone || 'NA',
      },
      [{ name: 'Medical Consultation', amount_cents: body.amount * 100, quantity: 1 }],
    );

    // Store payment record in DB (if Payment model exists)
    // await this.prisma.payment.create({...})

    return { iframeUrl, orderId };
  }

  /**
   * Paymob webhook callback
   */
  @Post('webhook')
  async handleWebhook(@Body() body: any, @Query('hmac') hmac: string) {
    // Validate HMAC
    const isValid = this.paymob.validateHmac(body.obj, hmac);
    if (!isValid) {
      return { status: 'invalid_hmac' };
    }

    const transaction = body.obj;
    const success = transaction.success === true || transaction.success === 'true';

    if (success) {
      // Update payment status in DB
      // await this.prisma.payment.update({...})
      
      // Optionally confirm the appointment
      // await this.prisma.appointment.update({
      //   where: { id: appointmentId },
      //   data: { status: 'APPROVED' }
      // });
    }

    return { status: success ? 'success' : 'failed' };
  }
}
