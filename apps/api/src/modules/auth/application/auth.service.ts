import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../../../common/prisma.service';
import { WhatsAppService } from '../../../common/whatsapp.service';
import { EmailService } from '../../../common/email.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly whatsappService: WhatsAppService,
    private readonly emailService: EmailService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new UnauthorizedException('Invalid credentials');

    if (user.role === 'patient' && !user.isEmailVerified) {
      throw new UnauthorizedException('Please verify your email address first');
    }

    const payload = { sub: user.id, email: user.email, role: user.role };
    return {
      accessToken: this.jwtService.sign(payload),
      user: { id: user.id, email: user.email, name: user.name, role: user.role },
    };
  }

  async register(data: { email: string; password: string; name: string; phone?: string }) {
    const existing = await this.prisma.user.findUnique({ where: { email: data.email } });
    
    if (existing) {
      if (existing.isEmailVerified) {
        throw new UnauthorizedException('User already exists');
      }
      
      // If unverified, allow re-registration (update info and send new code)
      const hashedPassword = await bcrypt.hash(data.password, 10);
      const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
      
      await this.prisma.user.update({
        where: { id: existing.id },
        data: {
          ...data,
          password: hashedPassword,
          emailVerificationCode: verificationCode,
        },
      });

      await this.emailService.sendOTP(data.email, verificationCode);
      return {
        user: { id: existing.id, email: existing.email, name: data.name, role: existing.role, isEmailVerified: false },
        message: 'Verification code resent'
      };
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    const user = await this.prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
        role: 'patient',
        isEmailVerified: false,
        emailVerificationCode: verificationCode,
      },
    });

    await this.emailService.sendOTP(data.email, verificationCode);

    return {
      user: { id: user.id, email: user.email, name: user.name, role: user.role, isEmailVerified: user.isEmailVerified },
    };
  }

  async verifyEmail(email: string, code: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new UnauthorizedException('User not found');

    if (user.emailVerificationCode !== code) {
      throw new UnauthorizedException('Invalid verification code');
    }

    await this.prisma.user.update({
      where: { id: user.id },
      data: { 
        isEmailVerified: true, 
        emailVerificationCode: null 
      }
    });

    const payload = { sub: user.id, email: user.email, role: user.role };
    return {
      accessToken: this.jwtService.sign(payload),
      user: { id: user.id, email: user.email, name: user.name, role: user.role },
    };
  }

  async resendCode(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new UnauthorizedException('User not found');

    const newCode = Math.floor(100000 + Math.random() * 900000).toString();

    await this.prisma.user.update({
      where: { id: user.id },
      data: { emailVerificationCode: newCode }
    });

    return this.emailService.sendOTP(email, newCode);
  }

  async getProfile(userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new UnauthorizedException('User not found');
    return { id: user.id, email: user.email, name: user.name, phone: user.phone, role: user.role };
  }

  async updateProfile(userId: string, data: { name?: string; phone?: string; currentPassword?: string; newPassword?: string }) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new UnauthorizedException('User not found');

    const updateData: any = {};
    if (data.name) updateData.name = data.name;
    if (data.phone) updateData.phone = data.phone;

    if (data.currentPassword && data.newPassword) {
      const isPasswordValid = await bcrypt.compare(data.currentPassword, user.password);
      if (!isPasswordValid) throw new UnauthorizedException('Invalid current password');
      updateData.password = await bcrypt.hash(data.newPassword, 10);
    }

    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: updateData,
    });

    return { id: updatedUser.id, email: updatedUser.email, name: updatedUser.name, phone: updatedUser.phone, role: updatedUser.role };
  }

  async forgotPassword(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new UnauthorizedException('User not found');

    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
    await this.prisma.user.update({
      where: { id: user.id },
      data: { emailVerificationCode: resetCode },
    });

    await this.emailService.sendOTP(email, resetCode);
    return { message: 'Reset code sent to your email' };
  }

  async resetPassword(email: string, code: string, newPassword: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new UnauthorizedException('User not found');

    if (user.emailVerificationCode !== code) {
      throw new UnauthorizedException('Invalid reset code');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await this.prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword, emailVerificationCode: null },
    });

    return { message: 'Password reset successfully' };
  }
}
