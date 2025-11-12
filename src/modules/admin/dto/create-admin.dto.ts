import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateAdminDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsOptional()
  roles?: string[];

  @IsOptional()
  permissions?: string[];
}
