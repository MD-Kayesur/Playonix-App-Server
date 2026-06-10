import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { QueryMediaDto } from './dto/query-media.dto';
import { MediaResponseDto } from './dto/media-response.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class MediaService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createMediaDto: CreateMediaDto): Promise<MediaResponseDto> {
    const { title, type, url } = createMediaDto;
    return this.prisma.media.create({
      data: {
        title: title.trim(),
        type: type.trim(),
        url: url.trim(),
      },
    });
  }

  async findAll(queryDto: QueryMediaDto): Promise<{
    data: MediaResponseDto[];
    meta: { total: number; page: number; limit: number; totalPage: number };
  }> {
    const { page = 1, limit = 10, search, type } = queryDto;
    const where: Prisma.mediaWhereInput = {};

    if (type) {
      where.type = { equals: type, mode: 'insensitive' };
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { type: { contains: search, mode: 'insensitive' } },
        { url: { contains: search, mode: 'insensitive' } },
      ];
    }

    const total = await this.prisma.media.count({ where });

    const mediaList = await this.prisma.media.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: 'desc' },
    });

    return {
      data: mediaList,
      meta: {
        total,
        page,
        limit,
        totalPage: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: number): Promise<MediaResponseDto> {
    const media = await this.prisma.media.findUnique({
      where: { id },
    });
    if (!media) {
      throw new NotFoundException(`Media with ID ${id} not found`);
    }
    return media;
  }

  async update(id: number, updateMediaDto: UpdateMediaDto): Promise<MediaResponseDto> {
    // Check if media exists first
    await this.findOne(id);

    const { title, type, url } = updateMediaDto;
    return this.prisma.media.update({
      where: { id },
      data: {
        title: title?.trim(),
        type: type?.trim(),
        url: url?.trim(),
      },
    });
  }

  async remove(id: number): Promise<{ message: string }> {
    // Check if media exists first
    await this.findOne(id);

    await this.prisma.media.delete({
      where: { id },
    });

    return { message: 'Media deleted successfully' };
  }
}
