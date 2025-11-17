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
CareerSchema.index({ status: 1, deadline: 1 });
CareerSchema.index({ department: 1, location: 1 });
CareerSchema.set('toJSON', {
  transform(_doc, ret: Record<string, any>): Record<string, any> {

    return JSON.parse(JSON.stringify(ret).replace(/_id/g, 'id')) as Record<
      string,
      any
    >;
  },
});