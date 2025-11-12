import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admin } from '../schemas/admin.schema';

@Injectable()
export class AdminRepository {
  constructor(
    @InjectModel(Admin.name)
    private readonly adminModel: Model<Admin>,
  ) {}

  async create(data: any) {
    const admin = new this.adminModel(data);
    return admin.save();
  }

  async findByEmail(email: string) {
    return this.adminModel.findOne({ email });
  }

  async findById(id: string) {
    return this.adminModel.findById(id);
  }

  async update(id: string, data: any) {
    return this.adminModel.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string) {
    return this.adminModel.findByIdAndDelete(id);
  }
}
