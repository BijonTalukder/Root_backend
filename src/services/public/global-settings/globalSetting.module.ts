import { Module } from "@nestjs/common";
import { GlobalSettingController } from "./globalSetting.controller";
import { GlobalSettingService } from "src/services/admin/global-settings/globalSetting.service";

@Module({
    imports:[],
    controllers:[GlobalSettingController],
    providers:[GlobalSettingService]
})
export class GlobalSettingModule{}