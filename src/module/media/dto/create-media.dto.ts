import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMediaDto {
  @ApiProperty({
    example: 'Awesome Intro Video',
    description: 'Media Title',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'video',
    description: 'Media Type (e.g. video, image, banner)',
  })
  @IsString()
  @IsNotEmpty()
  type: string;

  @ApiProperty({
    example: 'https://example.com/videos/intro.mp4',
    description: 'URL of the media asset',
  })
  @IsString()
  @IsNotEmpty()
  url: string;
}
