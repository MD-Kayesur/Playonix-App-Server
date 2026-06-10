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
    description: 'Media Type (video or image)',
  })
  @IsString()
  @IsOptional()
  type?: string;

  @ApiPropertyOptional({
    example: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    description: 'URL of the media asset',
  })
  @IsString()
  @IsOptional()
  url?: string;

  @ApiPropertyOptional({
    example: 'Energy Casino',
    description: 'Username of the media creator or provider',
  })
  @IsString()
  @IsOptional()
  username?: string;

  @ApiPropertyOptional({
    example: 'https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=100',
    description: 'Avatar image URL',
  })
  @IsString()
  @IsOptional()
  avatar?: string;

  @ApiPropertyOptional({
    example: '4.4 (2 Reviews)',
    description: 'Rating of the media provider',
  })
  @IsString()
  @IsOptional()
  rating?: string;

  @ApiPropertyOptional({
    example: '100% bonus up to €200 + 400 free spins',
    description: 'Description text',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    example: '4.4',
    description: 'Likes count (string)',
  })
  @IsString()
  @IsOptional()
  likes?: string;

  @ApiPropertyOptional({
    example: '2',
    description: 'Comments count (string)',
  })
  @IsString()
  @IsOptional()
  comments?: string;

  @ApiPropertyOptional({
    example: '0',
    description: 'Shares count (string)',
  })
  @IsString()
  @IsOptional()
  shares?: string;

  @ApiPropertyOptional({
    example: 'Claim Bonus',
    description: 'Action button text',
  })
  @IsString()
  @IsOptional()
  buttonText?: string;

  @ApiPropertyOptional({
    example: 'https://playonix.gg/bonus/energy',
    description: 'Redirection / click URL',
  })
  @IsString()
  @IsOptional()
  clickUrl?: string;
}
