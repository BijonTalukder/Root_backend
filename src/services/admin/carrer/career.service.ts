import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CareerDto } from "src/lib/dtos/career.dto";
import { Career } from "src/lib/schemas/career.schema";

@Injectable()
export class CarrerService {
  constructor(
    @InjectModel(Career.name)
    private readonly carrerModel: Model<Career>
  ) {}

  async create(dto: CareerDto) {
    return await this.carrerModel.create(dto);
  }

  async getAll(status?: boolean) {
    const filter: any = {};
    if (typeof status !== "undefined") filter.status = status;

    return await this.carrerModel.find(filter).sort({ createdAt: -1 }).exec();
  }

  async getById(id: string) {
    const career = await this.carrerModel.findById(id);
    if (!career) throw new NotFoundException("Career not found");
    return career;
  }

  async update(id: string, dto: Partial<CareerDto>) {
    const updatedCareer = await this.carrerModel.findByIdAndUpdate(id, dto, {
      new: true,
    });

    if (!updatedCareer)
      throw new NotFoundException("Career update failed! Career not found");

    return updatedCareer;
  }

  async delete(id: string) {
    const deleted = await this.carrerModel.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException("Career delete failed!");
    return deleted;
  }
}
