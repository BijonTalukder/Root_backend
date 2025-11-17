import { BadGatewayException, BadRequestException, Injectable } from "@nestjs/common";
import { FileManagerService } from "src/lib/s3_bucket/s3.service";

@Injectable()
export class UploadService {
  constructor(private readonly fileManager: FileManagerService) {}

  async uploadFile(file: Express.Multer.File) {
    const result = await this.fileManager.uploadFile(file, 'files');
    if (!result) throw new BadGatewayException("Upload failed");
    return result;
  }

  async uploadImage(file: Express.Multer.File) {
    console.log(file);
    
    const result = await this.fileManager.uploadWebp(file, 'gallery');
    if (!result) throw new BadGatewayException("Upload failed");
    return result;
  }

  async deleteFile(key: string) {
    const deleted = await this.fileManager.deleteFile(key);
    if (!deleted) throw new BadRequestException("Failed to delete file");
    return { success: true };
  }
}
