import { ApiProperty } from '@nestjs/swagger';

export class MediaResponseDto {
  @ApiProperty({
    description: 'Media ID',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Media Title',
    example: 'Awesome Intro Video',
  })
  title: string;

  @ApiProperty({
    description: 'Media Type',
    example: 'video',
  })
  type: string;

  @ApiProperty({
    description: 'Media URL',
    example: 'https://example.com/videos/intro.mp4',
  })
  url: string;

  @ApiProperty({
    description: 'Media Created At',
    example: '2022-01-01T00:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Media Updated At',
    example: '2022-01-01T00:00:00.000Z',
  })
  updatedAt: Date;
}
