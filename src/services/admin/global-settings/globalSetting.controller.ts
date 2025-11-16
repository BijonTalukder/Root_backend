import { Body, Controller, Get, Post } from "@nestjs/common";
import { GlobalSettingService } from "./globalSetting.service";
import { ResponseHandler } from "src/lib/interfaces/responseHandler";
import { CreateGlobalSettingDto } from "src/lib/dtos/global-setting.dto";


@Controller('admin/global-setting')
export class GlobalSettingController{
    constructor(
        private readonly globalSettingService:GlobalSettingService
    )
    {}

    @Get()
    async getSettings(): Promise<ResponseHandler> {
        const res = await this.globalSettingService.getSetting()
        return {
            success:true,
            data:res,
            message:'fetched global settings successfully'
        }
        
    }

    @Post()
    async createOrUpdate(@Body() dto:CreateGlobalSettingDto): Promise<ResponseHandler> {
        const res = await this.globalSettingService.createOrUpdate(dto)
        return{
            success:true,
            data:res,
            message:"create or update successfully"
        }
    }
}