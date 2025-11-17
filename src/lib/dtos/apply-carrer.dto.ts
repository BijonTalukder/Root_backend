import {
  IsArray,
  IsEmail,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from "class-validator";

export class ApplyDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  experience?: number;

  @IsString()
  @IsNotEmpty()
  resume: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  social_media?: string[];

  @IsOptional()
  @IsEnum(['view', 'short_list', 'select', 'rejected'])
  status?: 'view' | 'short_list' | 'select' | 'rejected';

  @IsOptional()
  @IsNumber()
  @Min(0)
  rank?: number;

  @IsMongoId()
  @IsNotEmpty()
  careerId: string;
}
