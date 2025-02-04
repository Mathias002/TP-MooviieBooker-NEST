import { Module } from '@nestjs/common';
import { MoviesApiController } from './movies-api.controller';
import { MoviesApiService } from './movies-api.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [MoviesApiController],
  providers: [MoviesApiService]
})
export class MoviesApiModule {}
