import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { Career } from "./career.schema";

export type ApplyDocument = HydratedDocument<Apply>;

@Schema({ versionKey: false, timestamps: true })
export class Apply {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: false, min: 0 })
  experience?: number; 

  @Prop({ required: true })
  resume: string; 

  @Prop({ type: [String], default: [] })
  social_media: string[];

  @Prop({
    required: true,
    enum: ['view', 'short_list', 'select', 'rejected'],
    default: 'view',
  })
  status: 'view' | 'short_list' | 'select' | 'rejected';

  @Prop({ required: false, default: 0 })
  rank?: number;

  @Prop({ type: Types.ObjectId, ref: Career.name, required: true })
  careerId: Types.ObjectId; 
}

export const ApplySchema = SchemaFactory.createForClass(Apply);
