import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateMediaDto {
  @ApiPropertyOptional({
    example: 'Awesome Intro Video',
    description: 'Media Title',
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({
    example: 'video',
    description: 'Media Type (e.g. video, image, banner)',
  })
  @IsString()
  @IsOptional()
  type?: string;

  @ApiPropertyOptional({
    example: 'https://example.com/videos/intro.mp4',
    description: 'URL of the media asset',
  })
  @IsString()
  @IsOptional()
  url?: string;
}
