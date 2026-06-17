import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class UpdateRatingDto {
  @ApiPropertyOptional({
    example: 5,
    description: 'The rating value between 1 and 5',
  })
  @IsNumber()
  @Min(1)
  @Max(5)
  @IsOptional()
  rating?: number;

  @ApiPropertyOptional({
    example: 'Updated awesome content!',
    description: 'Optional review comment',
  })
  @IsString()
  @IsOptional()
  comment?: string;
}
