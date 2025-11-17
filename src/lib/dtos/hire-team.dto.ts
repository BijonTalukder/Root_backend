import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Min,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";

export class RoleAllocationDto {
  @IsString()
  @IsNotEmpty()
  role: string;

  @IsOptional()
  @IsString()
  designation?: string;

  @IsNumber()
  @IsPositive()
  qty: number;

  @IsNumber()
  @Min(0)
  price: number;

  @IsEnum(['hourly', 'monthly'])
  priceType: 'hourly' | 'monthly';

  @IsOptional()
  @IsString()
  currency?: string = 'USD';
}

export class HireTeamDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsOptional()
  @IsString()
  note?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RoleAllocationDto)
  roleAllocation: RoleAllocationDto[];

  @IsOptional()
  @IsBoolean()
  status?: boolean = true;
}
