// import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import {
  ChangePasswordDto,
  CreateAdminDto,
  ForgotPasswordDto,
  LoginDto,
  ResetPasswordDto,
  SubmitOtpDto,
} from 'src/lib/dtos/admin-auth.dto';
import { IRequest } from 'src/lib/interfaces/request';
// import {
//   EMAIL_EXCHANGE_NAME,
//   FORGET_PASSWORD_EMAIL_ROUTING_KEY,
// } from 'src/lib/rmq/rmq-exchange.constants';
import { Admin } from 'src/lib/schemas/admin.schema';

@Injectable()
export class AuthService {
  private readonly isProduction = process.env.NODE_ENV === 'production';
  constructor(
    @InjectModel(Admin.name) private readonly adminModel: Model<Admin>,
    private jwtService: JwtService,
    private configService: ConfigService,
    // private rmqBroker: AmqpConnection,
  ) {}

  private generateOtp(): string {
    return this.isProduction
      ? Math.floor(100000 + Math.random() * 900000).toString()
      : '000000';
  }

     async create(data:CreateAdminDto){
         const admin = await this.adminModel.findOne({ email: data.email });
       if (!admin) {
      throw new NotFoundException('email already exist!');
        }

        const res= await this.adminModel.create(data)
        return res;

     }




  async login(data: LoginDto) {
    const admin = await this.adminModel.findOne({ email: data.email });
    if (!admin) {
      throw new NotFoundException('Admin not found');
    }
    const isPasswordValid = await bcrypt.compare(data.password, admin.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }
    const accessToken = this.jwtService.sign(
      { id: admin._id.toString(), role: 'admin' },
      {
        expiresIn: '30d',
        secret: this.configService.get<string>('SECRET_KEY'),
      },
    );
    const refreshToken = this.jwtService.sign(
      { id: admin._id.toString(), role: 'admin' },
      {
        expiresIn: '60d',
        secret: this.configService.get<string>('SECRET_KEY'),
      },
    );
    return { admin, token: { accessToken, refreshToken } };
  }

  async refreshToken(req: IRequest) {
    try {
      const token = req.headers?.['refresh-token'] as string;
      if (!token) {
        throw new UnauthorizedException('No Refresh token provided');
      }
      const decodedToken = this.jwtService.verify(token, {
        secret: this.configService.get<string>('SECRET_KEY'),
      }) as unknown as { id: string };
      const admin = await this.adminModel.findById(decodedToken.id);
      if (!admin) {
        throw new NotFoundException('Admin not found');
      }
      const accessToken = this.jwtService.sign(
        { id: admin._id.toString(), role: 'admin' },
        {
          expiresIn: '30d',
          secret: this.configService.get<string>('SECRET_KEY'),
        },
      );
      return { accessToken };
    } catch {
      throw new UnauthorizedException('Invalid Refresh token');
    }
  }

  async getProfile(req: IRequest) {
    const admin = await this.adminModel.findById(req.user?.id);
    if (!admin) {
      throw new NotFoundException('Admin not found');
    }
    return admin;
  }

  async forgotPassword(data: ForgotPasswordDto) {
    const admin = await this.adminModel.findOne({ email: data.email });
    if (!admin) {
      throw new NotFoundException('Admin not found');
    }
    const otp = this.generateOtp();
    const validity = Date.now() + 5 * 60 * 1000;
    const token = this.jwtService.sign(
      { otp, validity, email: admin.email },
      {
        secret: this.configService.get<string>('SECRET_KEY'),
      },
    );
    // await this.rmqBroker.publish(
    //   EMAIL_EXCHANGE_NAME,
    //   FORGET_PASSWORD_EMAIL_ROUTING_KEY,
    //   {
    //     email: admin.email,
    //     otp,
    //   },
    // );
    return { message: 'OTP sent', token, validity };
  }

  submitOtp(req: IRequest, data: SubmitOtpDto) {
    const otpToken = req.headers?.['otp-token'] as string;
    if (!otpToken) {
      throw new UnauthorizedException('Invalid OTP');
    }
    try {
      const decodedToken = this.jwtService.verify(otpToken, {
        secret: this.configService.get<string>('SECRET_KEY'),
      }) as unknown as { otp: string; validity: number; email: string };
      if (decodedToken.otp !== data.otp) {
        throw new UnauthorizedException('Invalid OTP');
      }
      if (Date.now() > decodedToken.validity) {
        throw new UnauthorizedException('OTP expired');
      }
      const validity = Date.now() + 5 * 60 * 1000;
      const resetToken = this.jwtService.sign(
        { email: decodedToken.email, validity },
        {
          secret: this.configService.get<string>('SECRET_KEY'),
        },
      );
      return { message: 'OTP verified', resetToken };
    } catch {
      throw new UnauthorizedException('OTP expired');
    }
  }

  async resetPassword(req: IRequest, data: ResetPasswordDto) {
    const resetToken = req.headers?.['reset-token'] as string;
    if (!resetToken) {
      throw new UnauthorizedException('Invalid Reset token');
    }
    try {
      const decodedToken = this.jwtService.verify(resetToken, {
        secret: this.configService.get<string>('SECRET_KEY'),
      }) as unknown as { email: string; validity: number };
      if (Date.now() > decodedToken.validity) {
        throw new UnauthorizedException('Reset session expired');
      }
      const admin = await this.adminModel.findOne({
        email: decodedToken.email,
      });
      if (!admin) {
        throw new NotFoundException('Admin not found');
      }
      if (data.newPassword !== data.confirmPassword) {
        throw new BadRequestException('Passwords do not match');
      }
      const isOldPassSameAsNew = await bcrypt.compare(
        data.newPassword,
        admin.password,
      );
      if (isOldPassSameAsNew) {
        throw new BadRequestException(
          'New password cannot be the same as old password',
        );
      }
      admin.password = data.confirmPassword;
      await admin.save();
      return { message: 'Password reset successful' };
    } catch {
      throw new UnauthorizedException('Invalid Reset token');
    }
  }

  async changePassword(req: IRequest, data: ChangePasswordDto) {
    const admin = await this.adminModel.findById(req.user?.id);
    if (!admin) {
      throw new NotFoundException('Admin not found');
    }
    const isOldPassValid = await bcrypt.compare(
      data.oldPassword,
      admin.password,
    );
    if (!isOldPassValid) {
      throw new UnauthorizedException('Old password is incorrect');
    }
    if (data.newPassword !== data.confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }
    const isOldPassSameAsNew = await bcrypt.compare(
      data.newPassword,
      admin.password,
    );
    if (isOldPassSameAsNew) {
      throw new BadRequestException(
        'New password cannot be the same as old password',
      );
    }
    admin.password = data.confirmPassword;
    await admin.save();
    return { message: 'Password changed successfully' };
  }
}
