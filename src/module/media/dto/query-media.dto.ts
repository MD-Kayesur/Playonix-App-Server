import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class QueryMediaDto {
  @ApiPropertyOptional({
    example: 10,
    description: 'Limit',
    default: 10,
    minimum: 1,
  })
  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  @Min(1)
  limit?: number;

  @ApiPropertyOptional({
    example: 1,
    description: 'Page',
    default: 1,
    minimum: 1,
  })
  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  @Min(1)
  page?: number;

  @ApiPropertyOptional({
    example: 'video',
    description: 'Filter by media type',
  })
  @IsOptional()
  @IsString()
  type?: string;

  @ApiPropertyOptional({
    example: 'intro',
    description: 'Search string (matches title, type, or url)',
  })
  @IsOptional()
  @IsString()
  search?: string;
}
