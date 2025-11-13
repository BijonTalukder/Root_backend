import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ChangePasswordDto,
  CreateAdminDto,
  ForgotPasswordDto,
  LoginDto,
  ResetPasswordDto,
  SubmitOtpDto,
} from 'src/lib/dtos/admin-auth.dto';
import { IRequest } from 'src/lib/interfaces/request';
// import { IRequest } from 'src/lib/interfaces/request';
// import { AdminAuthGuard } from 'src/lib/guards/admin-auth.guard';

@Controller('admin/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
    console.log(11111111);
    
  }


 @Post('create')
  async create(@Body() body: CreateAdminDto) {
    return await this.authService.create(body);
  }

  @Post('login')
  async login(@Body() body: LoginDto) {
    return await this.authService.login(body);
  }

//   @UseGuards(AdminAuthGuard)
  @Get('me')
  async getProfile(@Req() req: IRequest) {
    return await this.authService.getProfile(req);
  }

//   @UseGuards(AdminAuthGuard)
  @Patch('change-password')
  async changePassword(@Body() data: ChangePasswordDto, @Req() req: IRequest) {
    return await this.authService.changePassword(req, data);
  }

  @Get('refresh-token')
  async refreshToken(@Req() req: IRequest) {
    return await this.authService.refreshToken(req);
  }

  @Post('forgot-password')
  async forgotPassword(@Body() body: ForgotPasswordDto) {
    return await this.authService.forgotPassword(body);
  }

  @Post('submit-otp')
  submitOtp(@Req() req: IRequest, @Body() body: SubmitOtpDto) {
    return this.authService.submitOtp(req, body);
  }

  @Post('reset-password')
  async resetPassword(@Req() req: IRequest, @Body() body: ResetPasswordDto) {
    return await this.authService.resetPassword(req, body);
  }
}
