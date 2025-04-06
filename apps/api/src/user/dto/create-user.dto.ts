import { IsBoolean, IsDate, IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsString()
  githubId: string;

  @IsString()
  providerId: string;

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
