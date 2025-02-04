import { ForbiddenException, Injectable, Logger  } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map, catchError, firstValueFrom } from 'rxjs';

export interface MoviesResponse {
    page: number;
    results: Movie[];
  }
  
  interface Movie {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path?: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
  }

@Injectable()
export class MoviesApiService {
    private readonly logger = new Logger(MoviesApiService.name);
    constructor(
        private http : HttpService,
    ) {}

    async getPopularMovies(): Promise<MoviesResponse> {
        // console.log(process.env.TMBD_API_KEY);
        const { data } = await firstValueFrom(
            this.http
                .get<MoviesResponse>(
                    'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc',
                    {
                        withCredentials: true,
                        params: {
                            api_key: process.env.TMBD_API_KEY
                        },
                    },
                )
                .pipe(
                    catchError(() => {
                        throw new ForbiddenException('API not available');
                    }),
                ),
            );
            return data;
    }
}
