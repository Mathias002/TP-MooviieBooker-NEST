import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { MoviesApiService } from './movies-api.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Get movies')
@Controller('movies')
export class MoviesApiController {
  constructor(private moviesApiService: MoviesApiService) { }

  @ApiOperation({ summary: 'Popular films of the moment' })
  @ApiResponse({ status: 200, description: 'Films successfully recovered' })
  @ApiResponse({ status: 401, description: 'Films recovery failure' })
  @ApiBearerAuth()
  @Get('/popular')
  @UseGuards(AuthGuard())
  async getPopularMovies() {
    const response = await this.moviesApiService.getPopularMovies();
    const FilteredResponse = response.results.map((movie) => ({
      id: movie.id,
      title: movie.title,
      overview: movie.overview,
      genres: movie.genre_ids,
      original_title: movie.original_title,
      original_language: movie.original_language,
      release_date: movie.release_date,
      popularity: movie.popularity,
      vote_average: movie.vote_average,
      vote_count: movie.vote_count,
      poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      backdrop_url: `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`,
    }));

    return ConvertGenreId(FilteredResponse);
  }

  @ApiOperation({ summary: 'Search among popular films' })
  @ApiResponse({ status: 200, description: 'The search was successfully completed' })
  @ApiResponse({ status: 401, description: 'The search has failed' })
  @ApiBearerAuth()
  @Get('/popular/:param')
  @UseGuards(AuthGuard())
  async getFilteredPopularMovies(@Param('param') param: string) {
    const response = await this.moviesApiService.getPopularMovies();
    const FilteredResponse = response.results.map((movie) => ({
      id: movie.id,
      title: movie.title,
      overview: movie.overview,
      genres: movie.genre_ids,
      original_title: movie.original_title,
      original_language: movie.original_language,
      release_date: movie.release_date,
      popularity: movie.popularity,
      vote_average: movie.vote_average,
      vote_count: movie.vote_count,
      poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      backdrop_url: `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`,
    }));

    
    function Filter(Array, param) {

      const FilteredArray: any[] = [];

      for (let i = 0; i < Array.length; i++) {

        const ArrayIteration = typeof Array[i] === 'string' ? JSON.parse(Array[i]) : Array[i];

        const searchableFields = [
          ArrayIteration.id,
          ArrayIteration.title,
          ArrayIteration.original_title,
          ArrayIteration.original_language,
          ArrayIteration.overview,
          ArrayIteration.release_date,
          ArrayIteration.popularity,
          ArrayIteration.vote_average,
          ArrayIteration.vote_count,
        ].join(' ').toLowerCase();

        if (searchableFields.includes(param.toLowerCase())) {
          FilteredArray.push(ArrayIteration); // On garde l'objet et non sa version stringifiée
        }
      }
      return ConvertGenreId(FilteredArray);
    }
    return Filter(FilteredResponse, param);
  }

}

async function ConvertGenreId(movies: any[]) {
  try {
    // Récupérer les genres depuis l'API TMDB
    const genresResponse = await fetch(
      'https://api.themoviedb.org/3/genre/movie/list?language=en',
      {
        headers: {
          'Authorization': `Bearer ${process.env.TMBD_API_ACCES_KEY}`,
          'accept': 'application/json'
        }
      }
    );

    if (!genresResponse.ok) {
      throw new Error('Échec de la récupération des genres');
    }

    const { genres } = await genresResponse.json();

    return movies.map(movie => ({
      ...movie,
      genres: movie.genres.map(genreId => {
        const genre = genres.find(g => g.id === genreId);
        return genre ? genre.name : 'Genre Inconnu';
      })
    }));
  } catch (error) {
    console.error('Erreur lors de la conversion des genres:', error);
    return movies; // Retourner les films sans conversion en cas d'erreur
  }
}
