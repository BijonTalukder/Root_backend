import { IsOptional, IsString, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class ContactInfoDto {
  @IsOptional()
  @IsString()
  mobile?: string;

  @IsOptional()
  @IsString()
  email?: string;
}

class SocialLinkDto {
  @IsString()
  platform: string;

  @IsString()
  url: string;
}

export class CreateGlobalSettingDto {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  officeLocation?: string[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ContactInfoDto)
  contactInfo?: ContactInfoDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SocialLinkDto)
  socialLink?: SocialLinkDto[];

  @IsOptional()
  @IsString()
  visitRootStoreLink?: string;
}
