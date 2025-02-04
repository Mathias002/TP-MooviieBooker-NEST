import { Controller, Get } from '@nestjs/common';
import { MoviesApiService } from './movies-api.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('Get movies')
@Controller('movies')
export class MoviesApiController {
    constructor(private moviesApiService: MoviesApiService) {}

@ApiOperation({ summary: 'Popular films of the moment' })
@ApiResponse({ status: 200, description: 'Films successfully recovered' }) 
@ApiResponse({ status: 401, description: 'Films recovery failure' }) 
@Get('/popular')
  async getPopularMovies() {
    const response = await this.moviesApiService.getPopularMovies();
    return response.results.map((movie) => ({
        id: movie.id,
        title: movie.title,
        overview: movie.overview,
        release_date: movie.release_date,
        popularity: movie.popularity,
        vote_average: movie.vote_average,
        vote_count: movie.vote_count,
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`, 
        backdrop_url: `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`,
    }));
  }
    
}

