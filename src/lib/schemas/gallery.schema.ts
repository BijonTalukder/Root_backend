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

export const GallerySectionSchema =SchemaFactory.createForClass(GallerySection);
GallerySectionSchema.index({ status: 1, orderBy: 1 });
GallerySectionSchema.index({ sectionName: 1 });
GallerySectionSchema.index({ status: 1, orderBy: 1, sectionName: 1 });
GallerySectionSchema.set("toJSON", {
  transform(doc, ret) {
    delete ret.__v;

    // Recursively update image URLs
    if (ret.gallery?.length) {
      ret.gallery.forEach((frame: any) => {
        if (frame.images?.length) {
          frame.images = frame.images.map((img: any) => ({
            ...img,
            url: img.url.startsWith("http")
              ? img.url
              : `${process.env.AWS_BASE_URL}/${img.url}`,
          }));
        }
      });
    }
    return JSON.parse(JSON.stringify(ret).replace(/"_id"/g, '"id"'));
  },
});