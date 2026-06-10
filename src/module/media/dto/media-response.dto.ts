import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class MediaResponseDto {
  @ApiProperty({
    description: 'Media ID',
    example: 1,
  })
  id: number;

  @ApiPropertyOptional({
    description: 'Media Title',
    example: 'Awesome Intro Video',
    nullable: true,
  })
  title: string | null;

  @ApiProperty({
    description: 'Media Type',
    example: 'video',
  })
  type: string;

  @ApiProperty({
    description: 'Media URL',
    example: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  })
  url: string;

  @ApiProperty({
    description: 'Username of the creator',
    example: 'Energy Casino',
  })
  username: string;

  @ApiProperty({
    description: 'Avatar image URL',
    example: 'https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=100',
  })
  avatar: string;

  @ApiProperty({
    description: 'Rating string',
    example: '4.4 (2 Reviews)',
  })
  rating: string;

  @ApiProperty({
    description: 'Description text',
    example: '100% bonus up to €200 + 400 free spins',
  })
  description: string;

  @ApiProperty({
    description: 'Likes count',
    example: '4.4',
  })
  likes: string;

  @ApiProperty({
    description: 'Comments count',
    example: '2',
  })
  comments: string;

  @ApiProperty({
    description: 'Shares count',
    example: '0',
  })
  shares: string;

  @ApiProperty({
    description: 'Action button text',
    example: 'Claim Bonus',
  })
  buttonText: string;

  @ApiProperty({
    description: 'Redirection URL',
    example: 'https://playonix.gg/bonus/energy',
  })
  clickUrl: string;

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
