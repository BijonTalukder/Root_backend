import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { HireTeamService } from "./hireTeam.service";
import { HireTeamDto } from "src/lib/dtos/hire-team.dto";
import { ResponseHandler } from "src/lib/interfaces/responseHandler";

@Controller('admin/hire-team')
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

    @Get('all')
    async getAll(): Promise<ResponseHandler> {
        const res = await this.hireTeamService.getAll();
        return {
            success: true,
            data: res,
            message: "All hire teams fetched successfully"
        };
    }

    @Get('single/:id')
    async getById(@Param('id') id: string): Promise<ResponseHandler> {
        const res = await this.hireTeamService.getById(id);
        return {
            success: true,
            data: res,
            message: "Hire team fetched successfully"
        };
    }

    @Patch('update/:id')
    async update(
        @Param('id') id: string,
        @Body() data: Partial<HireTeamDto>
    ): Promise<ResponseHandler> {
        const res = await this.hireTeamService.update(id, data);
        return {
            success: true,
            data: res,
            message: "Hire team updated successfully"
        };
    }

    @Delete('delete/:id')
    async delete(@Param('id') id: string): Promise<ResponseHandler> {
        const res = await this.hireTeamService.delete(id);
        return {
            success: true,
            data: res,
            message: "Hire team deleted successfully"
        };
    }
}
