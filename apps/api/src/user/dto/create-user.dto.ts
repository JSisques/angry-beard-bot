import { IsBoolean, IsDate, IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  githubId?: string;

  @IsString()
  @IsOptional()
  providerId?: string;

  @IsString()
  supabaseId: string;

  @IsBoolean()
  @IsOptional()
  onboarded?: boolean;

  @IsDate()
  @IsOptional()
  createdAt?: Date;

  @IsDate()
  @IsOptional()
  updatedAt?: Date;
}
