import { Module } from "@nestjs/common";
import { GlobalSettingService } from "./globalSetting.service";
import { GlobalSettingController } from "./globalSetting.controller";

@Module({
    imports:[],
    controllers:[GlobalSettingController],
    providers:[GlobalSettingService]
})
export class GlobalSettingModule{

}