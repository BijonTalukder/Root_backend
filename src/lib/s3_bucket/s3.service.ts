import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  HeadObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { Injectable, OnModuleInit, OnModuleDestroy } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { randomUUID } from "crypto";
import sharp from "sharp";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

@Injectable()
export class FileManagerService implements OnModuleInit, OnModuleDestroy {
  private client: S3Client;
  private bucket: string;
  private region: string;
  private baseUrl: string;

  constructor(private readonly config: ConfigService) {
    this.bucket = this.config.get<string>('AWS_BUCKET_NAME')!;
    this.region = this.config.get<string>('AWS_REGION')!;
    this.baseUrl = this.config.get<string>('AWS_BASE_URL')!;
  }

  onModuleInit() {
    this.client = new S3Client({
      region: this.region,
      credentials: {
        accessKeyId: this.config.get<string>('AWS_ACCESS_KEY_ID')!,
        secretAccessKey: this.config.get<string>('AWS_SECRET_ACCESS_KEY')!,
      },
    });
  }

  onModuleDestroy() {
    this.client.destroy();
  }

  private generateKey(folder: string, ext: string) {
    return `${folder}/${randomUUID()}.${ext}`;
  }

  // Upload any file (Resume, Docs, etc.)
  async uploadFile(file: Express.Multer.File, folder = "files") {
    const ext = file.originalname.split(".").pop();
    const key = this.generateKey(folder, ext);

    await this.client.send(
      new PutObjectCommand({
        Bucket: this.bucket,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      })
    );

    return { key, url: `${this.baseUrl}/${key}` };
  }

  // Upload & convert image to WebP (Admin Gallery)
  async uploadWebp(file: Express.Multer.File, folder = "gallery") {
    const key = this.generateKey(folder, "webp");
    console.log(file)
    const webpData = await sharp(file.buffer).webp({ quality: 85 }).toBuffer();

    await this.client.send(
      new PutObjectCommand({
        Bucket: this.bucket,
        Key: key,
        Body: webpData,
        ContentType: "image/webp",
      })
    );

    return { key, url: `${this.baseUrl}/${key}` };
  }

  // Delete file by key
  async deleteFile(key: string) {
    await this.client.send(new DeleteObjectCommand({ Bucket: this.bucket, Key: key }));
    return true;
  }

  // Generate signed URL for restricted access
  async getSignedUrl(key: string) {
    const command = new GetObjectCommand({ Bucket: this.bucket, Key: key });
    return await getSignedUrl(this.client, command, { expiresIn: 3600 });
  }
}
