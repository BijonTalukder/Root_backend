import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type CareerDocument = HydratedDocument<Career>;

@Schema({ versionKey: false, timestamps: true })
export class Career {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  department: string;

  @Prop({ required: true })
  location: string;

  @Prop({ required: true })
  jobType: string; // e.g. 'Full-time', 'Part-time', 'Remote', etc.

  @Prop({ required: true })
  salaryRange: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: [String], default: [] })
  requirements: string[];

  @Prop({ type: [String], default: [] })
  responsibilities: string[];

  @Prop({ type: [String], default: [] })
  niceToHave: string[];

  @Prop({ required: true })
  deadline: string; 

  @Prop({ default: true })
  status: boolean;

  @Prop({ required: false })
  joinDate?: string; 
}

export const CareerSchema = SchemaFactory.createForClass(Career);
