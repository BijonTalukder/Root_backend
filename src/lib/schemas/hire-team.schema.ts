import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type HireTeamDocument = HydratedDocument<HireTeam>;


@Schema({ _id: false })
export class RoleAllocation {
  @Prop({ required: true })
  role: string;

  @Prop({ required: false })
  designation?: string;

  @Prop({ required: true, min: 1 })
  qty: number;

  @Prop({ required: true, min: 0 })
  price: number;

  @Prop({
    required: true,
    enum: ['hourly', 'monthly'],
    default: 'month',
  })
  priceType: 'hourly' | 'monthly';

  @Prop({ required: true, default: 'USD' })
  currency: string;
}

@Schema({ versionKey: false, timestamps: true })
export class HireTeam {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: false })
  note?: string;

  @Prop({ type: [RoleAllocation], default: [] })
  roleAllocation: RoleAllocation[];

  @Prop({ default: true })
  status: boolean;
}

export const HireTeamSchema = SchemaFactory.createForClass(HireTeam);
