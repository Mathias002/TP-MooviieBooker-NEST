import { Module } from '@nestjs/common';
import { MoviesApiController } from './movies-api.controller';
import { MoviesApiService } from './movies-api.service';
import { HttpModule } from '@nestjs/axios';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    HttpModule,
    AuthModule
  ],
  controllers: [MoviesApiController],
  providers: [MoviesApiService]
})
export class MoviesApiModule {}
