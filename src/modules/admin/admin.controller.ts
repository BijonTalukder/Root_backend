import { Body, Controller, Post } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { CreateAdminUseCase } from './use-cases/create-admin.usecase';

@Controller('admin')
export class AdminController {
  constructor(private readonly createAdminUseCase: CreateAdminUseCase) {}

  @Post()
  async create(@Body() dto: CreateAdminDto) {
    const admin = await this.createAdminUseCase.create(dto);
    return {
      message: 'Admin created successfully',
      data: admin,
    };
  }
}
