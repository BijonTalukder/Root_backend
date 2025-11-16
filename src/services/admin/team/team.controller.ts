import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { CreateTeamDto, UpdateTeamDto } from "src/lib/dtos/team.dto";
import { TeamService } from "./team.service";



@Controller('admin/team')
export class TeamController{
    constructor(
        private readonly teamService :TeamService
    ){}

     @Post('create')
  create(@Body() dto: CreateTeamDto) {
    return this.teamService.create(dto);
  }

  @Get('all')
  findAll() {
    return this.teamService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teamService.findOne(id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() dto: UpdateTeamDto) {
    return this.teamService.update(id, dto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.teamService.remove(id);
  }
}