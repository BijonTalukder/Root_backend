import { Controller, Post, UploadedFile, UseInterceptors, Body, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';

class DeleteFileDto {
  key: string;
}

@Controller('admin/file')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  // Resume or any file upload
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const res = await this.uploadService.uploadFile(file);
    return { success: true, message: 'File uploaded successfully', data: res };
  }

  // Gallery image upload as WebP
  @Post('gallery')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    if (!file) throw new BadRequestException('Image file is missing');
    const res = await this.uploadService.uploadImage(file);
    return { success: true, message: 'Uploaded as WebP', data: res };
  }

  // Delete file
  @Post('delete')
  async deleteFile(@Body() dto: DeleteFileDto) {
    const res = await this.uploadService.deleteFile(dto.key);
    return { success: true, message: 'File deleted successfully', data: res };
  }
}
