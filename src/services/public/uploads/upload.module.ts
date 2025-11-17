import { Module } from "@nestjs/common";
import { UploadController } from "./upload.controller";
import { UploadService } from "./upload.service";
import { FileManagerService } from "src/lib/s3_bucket/s3.service";

@Module({
    imports:[],
    controllers:[UploadController],
    providers:[UploadService,FileManagerService]
})
export class UploadModule{}