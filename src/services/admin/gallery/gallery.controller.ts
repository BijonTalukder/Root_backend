import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { GalleryService } from "./gallery.service";
import { GallerySectionDto} from "src/lib/dtos/gallery.dto";
import { ResponseHandler } from "src/lib/interfaces/responseHandler";

@Controller("admin/gallery")
export class GalleryController {
  constructor(private readonly galleryService: GalleryService) {}

  @Post("create")
  async create(@Body() dto: GallerySectionDto): Promise<ResponseHandler> {
    const res = await this.galleryService.createGallerySection(dto);
    return {
      success: true,
      data: res,
      message: "Gallery created successfully!",
    };
  }

  @Get("all")
  async getAll(
    @Query("status") status?: string,
    @Query("sortby") sortby?: string
  ): Promise<ResponseHandler> {
    const res = await this.galleryService.getAllGallerySection({
      status: status !== undefined ? status === "true" : undefined,
      sortby,
    });

    return {
      success: true,
      data: res,
      message: "Gallery fetched successfully!",
    };
  }

  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() dto: GallerySectionDto
  ): Promise<ResponseHandler> {
    const res = await this.galleryService.update(id, dto);
    return {
      success: true,
      data: res,
      message: "Gallery updated successfully!",
    };
  }

  // ====================== FRAME APIs =======================

  @Post(":sectionId/add-frame")
  async addFrame(
    @Param("sectionId") sectionId: string,
    @Body() dto: any
  ): Promise<ResponseHandler> {
    const res = await this.galleryService.addFrame(sectionId, dto);
    return {
      success: true,
      data: res,
      message: "Frame added successfully!",
    };
  }

  @Delete(":sectionId/remove-frame/:frameId")
  async removeFrame(
    @Param("sectionId") sectionId: string,
    @Param("frameId") frameId: string
  ): Promise<ResponseHandler> {
    const res = await this.galleryService.removeFrame(sectionId, frameId);
    return {
      success: true,
      data: res,
      message: "Frame removed successfully!",
    };
  }

  // ====================== IMAGE APIs =======================

  @Post(":sectionId/frame/:frameId/add-image")
  async addImage(
    @Param("sectionId") sectionId: string,
    @Param("frameId") frameId: string,
    @Body() dto: any
  ): Promise<ResponseHandler> {
    const res = await this.galleryService.addImage(sectionId, frameId, dto);
    return {
      success: true,
      data: res,
      message: "Image added successfully!",
    };
  }

  @Delete(":sectionId/frame/:frameId/remove-image/:imageId")
  async removeImage(
    @Param("sectionId") sectionId: string,
    @Param("frameId") frameId: string,
    @Param("imageId") imageId: string
  ): Promise<ResponseHandler> {
    const res = await this.galleryService.removeImage(sectionId, frameId, imageId);
    return {
      success: true,
      data: res,
      message: "Image removed successfully!",
    };
  }
}
