import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type TeamDocument = HydratedDocument<Team>
@Schema({versionKey:false,timestamps:true})
export class Team{
    @Prop({required:true,type:String})
    name:string

    @Prop({required:true,type:String})
    designation:string

    @Prop({required:false,type:String})
    imageUrl?:string

    @Prop({required:false,type:String})
    description?:string

    @Prop({required:false,type:Boolean,default:false})
    isStatic?:boolean

    @Prop({required:true,type:Number,default:0})
    orderBy:number

    @Prop({required:false,type:Boolean,default:true})
    status:boolean


}

export const TeamSchema = SchemaFactory.createForClass(Team);
TeamSchema.index({ status: 1, orderBy: 1 });
TeamSchema.set('toJSON', {
  transform(_doc, ret: Record<string, any>): Record<string, any> {

    return JSON.parse(JSON.stringify(ret).replace(/_id/g, 'id')) as Record<
      string,
      any
    >;
  },
});