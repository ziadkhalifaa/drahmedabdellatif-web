import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class WhatsAppService {
  private readonly logger = new Logger(WhatsAppService.name);

  async sendOTP(phone: string, code: string) {
    const message = `رمز التحقق الخاص بك لمنصة د. أحمد عبد اللطيف هو: ${code}\nيرجى عدم مشاركة هذا الرمز مع أي شخص.`;
    
    this.logger.log(`[WhatsApp OTP] Sending to ${phone}: ${message}`);
    
    // INTEGRATION POINT:
    // Here you would call an API like UltraMsg or Twilio
    // Example (UltraMsg):
    // await axios.post('https://api.ultramsg.com/instanceXXXXX/messages/chat', {
    //   token: 'XXXXX',
    //   to: phone,
    //   body: message
    // });

    return { success: true };
  }

  async sendAppointmentConfirmation(phone: string, details: { date: string; time: string; type: string; url?: string }) {
    const typeText = details.type === 'ONLINE' ? 'استشارة أونلاين' : 'موعد في العيادة';
    let message = `تم تأكيد موعدك مع د. أحمد عبد اللطيف:\nالتاريخ: ${details.date}\nالوقت: ${details.time}\nالنوع: ${typeText}`;
    
    if (details.url) {
      message += `\nرابط الاستشارة: ${details.url}`;
    }

    this.logger.log(`[WhatsApp Notification] Sending to ${phone}: ${message}`);
    return { success: true };
  }
}
