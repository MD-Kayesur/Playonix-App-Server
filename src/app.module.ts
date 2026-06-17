import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './module/auth/auth.module';
import { MediaModule } from './module/media/media.module';
import { RatingModule } from './module/rating/rating.module';

@Module({
  imports: [PrismaModule, AuthModule, MediaModule, RatingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
