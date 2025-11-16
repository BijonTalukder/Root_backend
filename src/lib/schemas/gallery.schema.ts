import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type GallerySectionDocument = HydratedDocument<GallerySection>;

@Schema({ _id: false })
export class Image {
  @Prop({ required: true, type: String })
  url: string;

  @Prop({
    required: true,
    type: String,
    enum: ["landscape", "portrait", "one_to_one"],
  })
  size: "landscape" | "portrait" | "one_to_one";

   @Prop({ required: false, type: String })
  description?: string;
@Prop({ required: false, type: Number, default: 1 })
orderBy?:number
}

@Schema() 
export class GalleryFrame {
  @Prop({ required: true, type: String })
  frame: string;

  @Prop({ type: [Image], default: [] })
  images: Image[];
  @Prop({ required: false, type: Boolean, default: true })
  status?: boolean;
  @Prop({ required: false, type: Number })
  page?: number;
}

@Schema({ versionKey: false, timestamps: true })
export class GallerySection {
  @Prop({ required: true, type: String })
  sectionName: string;

  @Prop({ required: false, type: String })
  sectionDescription?: string;

  @Prop({ required: false, type: Number, default: 1 })
  orderBy?: number;

  @Prop({ required: false, type: Boolean, default: true })
  status?: boolean;

  @Prop({ type: [GalleryFrame], default: [] })
  gallery: GalleryFrame[];
}

export const GallerySectionSchema =
  SchemaFactory.createForClass(GallerySection);
