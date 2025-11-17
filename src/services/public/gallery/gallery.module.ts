import { Module } from "@nestjs/common";
import { GalleryController } from "./gallery.controller";
import { GalleryService } from "src/services/admin/gallery/gallery.service";

@Module({
    imports:[],
    controllers:[GalleryController],
    providers:[GalleryService]
})
export class GalleryModule{}