import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type TestimonialDocument=HydratedDocument<Testimonial>;
@Schema({versionKey:false,timestamps:true})
export class Testimonial{
    @Prop({required:true,type:String})
    message:string;

    @Prop({required:false,type:Number,default:0})
    rating?:number

    @Prop({required:false,type:String})
    avatar?:string

    @Prop({required:true,type:String})
    name:string

    @Prop({required:false,type:String})
    designation?:string

      @Prop({required:true,type:Number,default:0})
    orderBy:number

    @Prop({required:false,type:Boolean,default:true})
    status:boolean


}
export const TestimonialSchema = SchemaFactory.createForClass(Testimonial);
