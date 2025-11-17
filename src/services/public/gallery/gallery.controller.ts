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
import { ResponseHandler } from "src/lib/interfaces/responseHandler";
import { GalleryService } from "src/services/admin/gallery/gallery.service";

@Controller("public/gallery")
export class GalleryController {
  constructor(private readonly galleryService: GalleryService) {}



  @Get("all")
  async getAll(
    @Query("status") status?: string,
    @Query("sortby") sortby?: string
  ): Promise<ResponseHandler> {
    const res = await this.galleryService.getAllGallerySection({
      status: status !== undefined ? status === "true" : true,
      sortby,
    });

    return {
      success: true,
      data: res,
      message: "Gallery fetched successfully!",
    };
  }







  
}
