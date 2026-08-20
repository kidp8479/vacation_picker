import { IsOptional, IsString, IsUrl, IsNotEmpty } from 'class-validator';

export class CreateDestinationDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsOptional()
  @IsString()
  subtitle?: string;

  @IsUrl()
  photo_url!: string;

  @IsString()
  @IsNotEmpty()
  transport!: string;

  @IsString()
  @IsNotEmpty()
  body_description!: string;
}
