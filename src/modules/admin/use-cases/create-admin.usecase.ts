// src/modules/admin/use-cases/create-admin.usecase.ts
import { Injectable } from '@nestjs/common';
import { AdminRepository } from 'src/infrastructure/database/mongo/repositories/admin.repository';
import { CreateAdminDto } from '../dto/create-admin.dto';

@Injectable()
export class CreateAdminUseCase {
  constructor(private readonly adminRepo: AdminRepository) {}

  async create(dto: CreateAdminDto) {
    const existing = await this.adminRepo.findByEmail(dto.email);
    if (existing) throw new Error('Email already exists');

    const hashedPassword = 'hashed'; 
    return this.adminRepo.create({ ...dto, password: hashedPassword });
  }
}
