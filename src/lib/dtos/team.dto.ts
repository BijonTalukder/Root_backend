import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
export class CreateTeamDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  designation: string;

  @IsString()
  @IsOptional()
  imageUrl?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  @IsOptional()
  isStatic?: boolean;

  @IsNumber()
  @IsOptional()
  orderBy?: number;

  @IsBoolean()
  @IsOptional()
  status?: boolean;
}
export class UpdateTeamDto extends PartialType(CreateTeamDto) {}