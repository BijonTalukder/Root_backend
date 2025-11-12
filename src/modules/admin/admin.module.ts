import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Admin, AdminSchema } from 'src/infrastructure/database/mongo/schemas/admin.schema';
import { AdminController } from './admin.controller';
import { CreateAdminUseCase } from './use-cases/create-admin.usecase';
import { AdminRepository } from 'src/infrastructure/database/mongo/repositories/admin.repository';

@Module({
  imports: [MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }])],
  controllers: [AdminController],
  providers: [CreateAdminUseCase, AdminRepository],
  exports: [AdminRepository],
})
export class AdminModule {}
