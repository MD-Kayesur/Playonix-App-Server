import { Controller, Get, Post, Body, Param, Patch, ParseIntPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { RatingService, Rating } from './rating.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('rating')
@Controller('rating')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @Post()
  @ApiOperation({ summary: 'Submit a new media rating' })
  @ApiBody({ type: CreateRatingDto })
  @ApiResponse({
    status: 201,
    description: 'Rating submitted successfully',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'number', example: 1 },
        mediaId: { type: 'number', example: 1 },
        rating: { type: 'number', example: 5 },
        comment: { type: 'string', example: 'Awesome content!' },
        createdAt: { type: 'string', example: '2026-06-17T12:00:00.000Z' },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Invalid payload' })
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createRatingDto: CreateRatingDto): Rating {
    return this.ratingService.create(createRatingDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing rating' })
  @ApiBody({ type: UpdateRatingDto })
  @ApiResponse({
    status: 200,
    description: 'Rating updated successfully',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'number', example: 1 },
        mediaId: { type: 'number', example: 1 },
        rating: { type: 'number', example: 4 },
        comment: { type: 'string', example: 'Updated awesome content!' },
        createdAt: { type: 'string', example: '2026-06-17T12:00:00.000Z' },
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Rating not found' })
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRatingDto: UpdateRatingDto,
  ): Rating {
    return this.ratingService.update(id, updateRatingDto);
  }

  @Get('media/:mediaId')
  @ApiOperation({ summary: 'Get all ratings for a specific media item' })
  @ApiResponse({
    status: 200,
    description: 'List of ratings retrieved successfully',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'number', example: 1 },
          mediaId: { type: 'number', example: 1 },
          rating: { type: 'number', example: 5 },
          comment: { type: 'string', example: 'Awesome content!' },
          createdAt: { type: 'string', example: '2026-06-17T12:00:00.000Z' },
        },
      },
    },
  })
  @HttpCode(HttpStatus.OK)
  findAllByMediaId(@Param('mediaId', ParseIntPipe) mediaId: number): Rating[] {
    return this.ratingService.findAllByMediaId(mediaId);
  }

  @Get('media/:mediaId/stats')
  @ApiOperation({ summary: 'Get average rating statistics for a media item' })
  @ApiResponse({
    status: 200,
    description: 'Average rating statistics retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        average: { type: 'number', example: 4.5 },
        count: { type: 'number', example: 12 },
      },
    },
  })
  @HttpCode(HttpStatus.OK)
  getStats(@Param('mediaId', ParseIntPipe) mediaId: number) {
    return this.ratingService.getAverageRating(mediaId);
  }
}
