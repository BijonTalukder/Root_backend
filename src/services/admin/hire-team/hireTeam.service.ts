import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { HireTeamDto } from "src/lib/dtos/hire-team.dto";
import { HireTeam } from "src/lib/schemas/hire-team.schema";

@Injectable()
export class HireTeamService {
  constructor(
    @InjectModel(HireTeam.name)
    private readonly hireTeamModel: Model<HireTeam>
  ) {}

  // Create new team
  async create(data: HireTeamDto) {
    return await this.hireTeamModel.create(data);
  }

  // Get all teams (sorted by latest)
  async getAll() {
    return await this.hireTeamModel.find().sort({ createdAt: -1 });
  }

  // Get team by ID
  async getById(id: string) {
    const team = await this.hireTeamModel.findById(id);
    if (!team) throw new NotFoundException("Hire team not found");
    return team;
  }

  // Update team by ID
  async update(id: string, data: Partial<HireTeamDto>) {
    const updated = await this.hireTeamModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!updated) throw new NotFoundException("Hire team not found");
    return updated;
  }

  // Delete team by ID
  async delete(id: string) {
    const deleted = await this.hireTeamModel.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException("Hire team not found");
    return {
      message: "Hire team deleted successfully",
      data: deleted,
    };
  }
}
