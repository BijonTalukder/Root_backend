import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { ApplyDto } from "src/lib/dtos/apply-carrer.dto";
import { Apply } from "src/lib/schemas/apply.schema";
import { Career } from "src/lib/schemas/career.schema";

@Injectable()
export class ApplyService {
  constructor(
    @InjectModel(Apply.name)
    private readonly applyModel: Model<Apply>,

    @InjectModel(Career.name)
    private readonly careerModel:Model<Career>
  ) {}

  async create(dto: ApplyDto) {

    const careerID =new Types.ObjectId(dto.careerId) 
    if(!careerID)
        throw new BadRequestException("career id is required!")

    const career = await this.careerModel.findOne({_id:careerID,status:true})
    if(!career){
                throw new BadRequestException("select valid carrer !")

    }

    return await this.applyModel.create(dto);
  }

  async getAll() {
    return await this.applyModel.find().populate("careerId").sort({ createdAt: -1 });
  }

  async getById(id: string) {
    const res = await this.applyModel.findById(id).populate("careerId");
    if (!res) throw new NotFoundException("Apply entry not found");
    return res;
  }

  async update(id: string, dto: Partial<ApplyDto>) {
    const res = await this.applyModel.findByIdAndUpdate(id, dto, { new: true });
    if (!res) throw new NotFoundException("Apply entry not found");
    return res;
  }

  async delete(id: string) {
    const res = await this.applyModel.findByIdAndDelete(id);
    if (!res) throw new NotFoundException("Apply entry not found");
    return { message: "Deleted successfully", data: res };
  }
}
