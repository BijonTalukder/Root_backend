import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type GlobalSettingDocument = HydratedDocument<GlobalSetting>;

@Schema({ versionKey: false, timestamps: true })
export class GlobalSetting {
  @Prop({ type: [String], default: [] })
  officeLocation: string[];

  @Prop({ type: [String], default: [] })
  contactInfo: string[];

  @Prop({ type: [String], default: [] })
  socialLink: string[];

  @Prop({ required: false })
  visitRootStoreLink?: string;

}


export const GlobalSettingSchema = SchemaFactory.createForClass(GlobalSetting);
