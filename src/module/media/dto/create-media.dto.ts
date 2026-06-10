import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateMediaDto {
  @ApiPropertyOptional({
    example: 'Awesome Intro Video',
    description: 'Media Title',
    required: false,
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({
    example: 'video',
    description: 'Media Type (video or image)',
  })
  @IsString()
  @IsNotEmpty()
  type: string;

  @ApiProperty({
    example: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    description: 'URL of the media asset',
    required: false,
  })
  @IsString()
  @IsOptional()
  url?: string;

  @ApiProperty({
    example: 'Energy Casino',
    description: 'Username of the media creator or provider',
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    example: 'https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=100',
    description: 'Avatar image URL',
    required: false,
  })
  @IsString()
  @IsOptional()
  avatar?: string;

  @ApiProperty({
    example: '4.4 (2 Reviews)',
    description: 'Rating of the media provider',
  })
  @IsString()
  @IsNotEmpty()
  rating: string;

  @ApiProperty({
    example: '100% bonus up to €200 + 400 free spins',
    description: 'Description text',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example: '4.4',
    description: 'Likes count (string)',
  })
  @IsString()
  @IsNotEmpty()
  likes: string;

  @ApiProperty({
    example: '2',
    description: 'Comments count (string)',
  })
  @IsString()
  @IsNotEmpty()
  comments: string;

  @ApiProperty({
    example: '0',
    description: 'Shares count (string)',
  })
  @IsString()
  @IsNotEmpty()
  shares: string;

  @ApiProperty({
    example: 'Claim Bonus',
    description: 'Action button text',
  })
  @IsString()
  @IsNotEmpty()
  buttonText: string;

  @ApiProperty({
    example: 'https://playonix.gg/bonus/energy',
    description: 'Redirection / click URL',
  })
  @IsString()
  @IsNotEmpty()
  clickUrl: string;
}
