import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AdminDocument = HydratedDocument<Admin>;

@Schema({ versionKey: false, timestamps: true })
export class Admin {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: [String], default: ['super_admin'] })
  roles: string[];

  @Prop({ type: [String], default: [] })
  permissions: string[];
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
