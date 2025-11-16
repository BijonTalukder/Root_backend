import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateGlobalSettingDto } from "src/lib/dtos/global-setting.dto";
import { GlobalSetting } from "src/lib/schemas/global-setting.schema";


@Injectable()
export class GlobalSettingService{
    constructor(
        @InjectModel(GlobalSetting.name)
        private readonly globalSettingModel:Model<GlobalSetting>
    ){}

     async getSetting() {
    const setting = await this.globalSettingModel.findOne();
    if (!setting) {
      throw new NotFoundException('Global settings not found!');
    }
    return setting;
  }

  async createOrUpdate(dto: CreateGlobalSettingDto ) {
    const existingSetting = await this.globalSettingModel.findOne();

    if (existingSetting) {
      return this.globalSettingModel.findByIdAndUpdate(
        existingSetting._id,
        dto,
        { new: true },
      );
    }

    return this.globalSettingModel.create(dto);
  }
}