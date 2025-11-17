import { Body, Controller, Get, Post } from "@nestjs/common";
import { ResponseHandler } from "src/lib/interfaces/responseHandler";
import { CreateGlobalSettingDto } from "src/lib/dtos/global-setting.dto";
import { GlobalSettingService } from "src/services/admin/global-settings/globalSetting.service";


@Controller('public/global-setting')
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
}