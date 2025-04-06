import { ApiProperty } from '@nestjs/swagger';

export class GitHubUserDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  name?: string;

  @ApiProperty()
  githubId: string;

  @ApiProperty()
  githubToken: string;
}
