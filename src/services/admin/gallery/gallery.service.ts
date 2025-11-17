import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { GallerySectionDto } from "src/lib/dtos/gallery.dto";
import { GallerySection } from "src/lib/schemas/gallery.schema";


@Injectable()
export class GalleryService{
    constructor(
        @InjectModel(GallerySection.name)
        private readonly gallerySectionModel:Model<GallerySection>
    ){}

    async createGallerySection(data:GallerySectionDto){
        return await this.gallerySectionModel.create(data)
    }


async getAllGallerySection({
  status,
  sortby = "orderBy",
}: {
  status?: boolean;
  sortby?: string;
}) {
  const filter: any = {};
  if (typeof status !== "undefined") {
    filter.status = status;
  }

  const sections = await this.gallerySectionModel.aggregate([
    { $match: filter },

    // Sort Sections
    { $sort: { [sortby]: 1 } },

    // Sort frames and images
    {
      $set: {
        gallery: {
          $map: {
            input: "$gallery",
            as: "frame",
            in: {
              $mergeObjects: [
                "$$frame",
                {
                  images: {
                    $sortArray: {
                      input: "$$frame.images",
                      sortBy: { orderBy: 1 },
                    },
                  },
                },
              ],
            },
          },
        },
      },
    },
    {
      $set: {
        gallery: {
          $sortArray: {
            input: "$gallery",
            sortBy: { page: 1 },
          },
        },
      },
    },
  ]);

  // Add base URL manually
  const baseUrl = process.env.AWS_BASE_URL;

  return sections.map((section) => ({
    ...section,
    gallery: section.gallery.map((frame) => ({
      ...frame,
      images: frame.images.map((img) => ({
        ...img,
        url: img.url.startsWith("http")
          ? img.url
          : `${baseUrl}/${img.url}`,
      })),
    })),
  }));
}


 async findOne(id: string) {
    const section = await this.gallerySectionModel.findById(id).exec();
    if (!section) throw new NotFoundException("Gallery section not found");
    return section;
  }

  async update(id: string, dto) {
    const updated = await this.gallerySectionModel
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();
    if (!updated) throw new NotFoundException("Gallery section not found");
    return updated;
  }


   async addFrame(sectionId: string, dto: any) {
    const result = await this.gallerySectionModel.findByIdAndUpdate(
      sectionId,
      { $push: { gallery: dto } },
      { new: true }
    );
    return result;
  }

  async removeFrame(sectionId: string, frameId: string) {
    const result = await this.gallerySectionModel.findByIdAndUpdate(
      sectionId,
      { $pull: { gallery: { _id: frameId } } },
      { new: true }
    );
    return result;
  }

  

  async addImage(sectionId: string, frameId: string, dto: any) {
    return this.gallerySectionModel.findOneAndUpdate(
      { _id: sectionId, "gallery._id": frameId },
      { $push: { "gallery.$.images": dto } },
      { new: true }
    );
  }

  async removeImage(sectionId: string, frameId: string, imageId: string) {
    return this.gallerySectionModel.findOneAndUpdate(
      { _id: sectionId, "gallery._id": frameId },
      { $pull: { "gallery.$.images": { _id: imageId } } },
      { new: true }
    );
  }
}