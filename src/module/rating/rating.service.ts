import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';

export interface Rating {
  id: number;
  mediaId: number;
  rating: number;
  comment?: string;
  createdAt: Date;
}

@Injectable()
export class RatingService {
  private ratings: Rating[] = [];
  private idCounter = 1;

  create(createRatingDto: CreateRatingDto): Rating {
    const newRating: Rating = {
      id: this.idCounter++,
      ...createRatingDto,
      createdAt: new Date(),
    };
    this.ratings.push(newRating);
    return newRating;
  }

  update(id: number, updateRatingDto: UpdateRatingDto): Rating {
    const ratingIndex = this.ratings.findIndex((r) => r.id === id);
    if (ratingIndex === -1) {
      throw new NotFoundException(`Rating with ID ${id} not found`);
    }
    const existingRating = this.ratings[ratingIndex];
    const updatedRating = {
      ...existingRating,
      ...updateRatingDto,
    };
    this.ratings[ratingIndex] = updatedRating;
    return updatedRating;
  }

  findAllByMediaId(mediaId: number): Rating[] {
    return this.ratings.filter((r) => r.mediaId === mediaId);
  }

  getAverageRating(mediaId: number): { average: number; count: number } {
    const mediaRatings = this.findAllByMediaId(mediaId);
    if (mediaRatings.length === 0) {
      return { average: 0, count: 0 };
    }
    const sum = mediaRatings.reduce((acc, curr) => acc + curr.rating, 0);
    return {
      average: parseFloat((sum / mediaRatings.length).toFixed(1)),
      count: mediaRatings.length,
    };
  }
}
