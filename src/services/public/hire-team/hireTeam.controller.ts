import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";

import { HireTeamDto } from "src/lib/dtos/hire-team.dto";
import { ResponseHandler } from "src/lib/interfaces/responseHandler";
import { HireTeamService } from "src/services/admin/hire-team/hireTeam.service";

@Controller('public/hire-team')
export class HireTeamController {
    constructor(
        private readonly hireTeamService: HireTeamService
    ){}

    @Post('create')  
    async create(@Body() data: HireTeamDto): Promise<ResponseHandler> {
        const res = await this.hireTeamService.create(data);
        return {
            success: true,
            data: res,
            message: "Hire team added successfully"
        };
    }
}
