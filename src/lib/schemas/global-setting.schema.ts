import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type GlobalSettingDocument = HydratedDocument<GlobalSetting>;

class ContactInfo {
  @Prop({ type: String })
  mobile?: string;

  @Prop({ type: String })
  email?: string;
}

class SocialLink {
  @Prop({ type: String })
  platform: string; // facebook, linkedin, etc.

  @Prop({ type: String })
  url: string; // link url
}

@Schema({ versionKey: false, timestamps: true })
export class GlobalSetting {
  @Prop({ type: [String], default: [] })
  officeLocation: string[];

  @Prop({
    type: [
      {
        mobile: { type: String },
        email: { type: String },
      },
    ],
    default: [],
  })
  contactInfo: ContactInfo[];

  @Prop({
    type: [
      {
        platform: { type: String },
        url: { type: String },
      },
    ],
    default: [],
  })
  socialLink: SocialLink[];

  @Prop({ required: false, type: String })
  visitRootStoreLink?: string;
}

export const GlobalSettingSchema = SchemaFactory.createForClass(GlobalSetting);
