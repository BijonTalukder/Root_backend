import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTeamDto, UpdateTeamDto } from 'src/lib/dtos/team.dto';
import { Team, TeamDocument } from 'src/lib/schemas/team.schema';

@Injectable()
export class TeamService {
  constructor(
    @InjectModel(Team.name)
    private readonly teamModel: Model<TeamDocument>,
  ) {}

  async create(dto: CreateTeamDto): Promise<Team> {
    const newTeam = new this.teamModel(dto);
    return await newTeam.save();
  }

  async findAll(status?: boolean): Promise<Team[]> {
    const filter = status !== undefined ? { status } : {};
    return await this.teamModel.find(filter).sort({ orderBy: 1 }).exec();
  }

  async findOne(id: string): Promise<Team> {
    const team = await this.teamModel.findById(id).exec();
    if (!team) throw new NotFoundException('Team not found');
    return team;
  }

  async update(id: string, dto: UpdateTeamDto): Promise<Team> {
    const updated = await this.teamModel
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();

    if (!updated) throw new NotFoundException('Team not found to update');

    return updated;
  }

  async remove(id: string): Promise<{ message: string }> {
    const deleted = await this.teamModel.findByIdAndDelete(id).exec();
    if (!deleted) throw new NotFoundException('Team not found to delete');

    return { message: 'Team deleted successfully' };
  }

//   async updateStatus(id: string, status: boolean) {
//     return this.update(id, { status });
//   }
}
