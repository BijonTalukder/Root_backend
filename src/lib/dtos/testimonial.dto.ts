import { IsString, IsOptional, IsNumber, IsBoolean, Min, Max, Length } from 'class-validator';

export class CreateTestimonialDto {
  
  @IsString()
  @Length(3, 500)
  message: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(5)
  rating?: number;

  @IsOptional()
  @IsString()
  avatar?: string;

  @IsString()
  @Length(2, 100)
  name: string;

  @IsOptional()
  @IsString()
  designation?: string;

  @IsOptional()
  @IsNumber()
  orderBy?: number;

  @IsOptional()
  @IsBoolean()
  status?: boolean;
}
