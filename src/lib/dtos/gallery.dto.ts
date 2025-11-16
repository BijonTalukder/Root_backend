import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";

// Nested Image DTO
class CreateImageDto {
  @IsString()
  url: string;

  @IsEnum(["landscape", "portrait", "one_to_one"])
  size: "landscape" | "portrait" | "one_to_one";

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  orderBy?: number;
}

// Nested Frame DTO
class CreateGalleryFrameDto {
  @IsString()
  frame: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateImageDto)
  images?: CreateImageDto[];

  @IsOptional()
  @IsBoolean()
  status?: boolean;

  @IsOptional()
  @IsNumber()
  page?: number;
}

// Main Section DTO
export class GallerySectionDto {
  @IsString()
  @IsOptional()
  sectionName: string;

  @IsString()
  @IsOptional()
  sectionDescription: string;

  @IsNumber()
  @IsOptional()
  orderBy: number;

  @IsOptional()
  @IsBoolean()
  status?: boolean;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateGalleryFrameDto)
  gallery?: CreateGalleryFrameDto[];
}
