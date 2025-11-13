import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ContactUsDocument = HydratedDocument<ContactUs>;

@Schema({ versionKey: false, timestamps: true })
export class ContactUs {
  @Prop({ required: true, type: String })
  name: string;

  @Prop({ required: true, type: String })
  email: string;

  @Prop({ required: false, type: String })
  description?: string;

  @Prop({ required: false, type: [{ fileKey: { type: String } }] })
  documents?: { fileKey: string }[];

  @Prop({ required: false, type: [String] })
  services?: string[];

  @Prop({ required: false, type: [String] })
  referralSource?: string[];

  @Prop({ required: false, type: Boolean, default: true })
  status?: boolean;
}

export const ContactUsSchema = SchemaFactory.createForClass(ContactUs);
