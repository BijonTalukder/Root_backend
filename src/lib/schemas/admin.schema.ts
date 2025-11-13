import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as paginate from 'mongoose-paginate-v2';

export type AdminDocument = HydratedDocument<Admin>;

@Schema({ versionKey: false, timestamps: true })
export class Admin {
  @Prop({ required: true ,type:String})
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: [String], default: ['super_admin'] })
  roles: string[];

  @Prop({ type: [String], default: [] })
  permissions: string[];

  @Prop({required:false,type:Boolean,default:true})
  status:boolean
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
AdminSchema.pre<AdminDocument>('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  if (this.password) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  return next();
});
// AdminSchema.plugin(paginate);

AdminSchema.set('toJSON', {
  transform(_doc, ret: Record<string, any>): Record<string, any> {
    delete ret.password;
    return JSON.parse(JSON.stringify(ret).replace(/_id/g, 'id')) as Record<
      string,
      any
    >;
  },
});