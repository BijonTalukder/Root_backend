import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { CreateTeamDto, UpdateTeamDto } from "src/lib/dtos/team.dto";
import { TeamService } from "src/services/admin/team/team.service";




@Controller('public/team')
export class TeamController{
    constructor(
        private readonly teamService :TeamService
    ){}

     

  @Get('all')
  findAll() {
    return this.teamService.findAll(true);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teamService.findOne(id);
  }

 
}