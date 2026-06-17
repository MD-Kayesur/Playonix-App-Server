import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateRatingDto {
  @ApiProperty({
    example: 1,
    description: 'The ID of the media item to rate',
  })
  @IsInt()
  @IsNotEmpty()
  mediaId: number;

  @ApiProperty({
    example: 5,
    description: 'The rating value between 1 and 5',
  })
  @IsNumber()
  @Min(1)
  @Max(5)
  @IsNotEmpty()
  rating: number;

  @ApiProperty({
    example: 'Awesome content!',
    description: 'Optional review comment',
    required: false,
  })
  @IsString()
  @IsOptional()
  comment?: string;
}
