import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsOptional,
  IsString,
} from "class-validator";

export class CareerDto {
  @IsString()
  title: string;

  @IsString()
  department: string;

  @IsString()
  location: string;

  @IsString()
  jobType: string; // Full-time, Remote, Part-time etc.

  @IsString()
  salaryRange: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  requirements?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  responsibilities?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  niceToHave?: string[];

  @IsDateString()
  deadline: string;

  @IsOptional()
  @IsBoolean()
  status?: boolean;

  @IsOptional()
  @IsDateString()
  joinDate?: string;
}
