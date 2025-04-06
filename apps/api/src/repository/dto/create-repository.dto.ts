import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRepositoryDto {
  @IsString()
  @IsNotEmpty()
  githubId: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  url: string;
}
