import { Test, TestingModule } from '@nestjs/testing';
import { MoviesApiService, MoviesResponse } from './movies-api.service';
import { HttpService } from '@nestjs/axios';
import { of, throwError } from 'rxjs';
import { ForbiddenException } from '@nestjs/common';

describe('MoviesApiService', () => {
  let service: MoviesApiService;
  let httpService: HttpService;

  const mockHttpService = {
    get: jest.fn()
  };

  const mockMoviesResponse: MoviesResponse = {
    page: 1,
    results: [
      {
        adult: false,
        backdrop_path: '/backdrop.jpg',
        genre_ids: [28, 12],
        id: 1,
        original_language: 'en',
        original_title: 'Test Movie',
        overview: 'A test movie overview',
        popularity: 100,
        poster_path: '/poster.jpg',
        release_date: '2023-01-01',
        title: 'Test Movie',
        video: false,
        vote_average: 7.5,
        vote_count: 1000
      }
    ]
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MoviesApiService,
        {
          provide: HttpService,
          useValue: mockHttpService
        }
      ]
    }).compile();

    service = module.get<MoviesApiService>(MoviesApiService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getPopularMovies', () => {
    it('should return popular movies successfully', async () => {
      jest.spyOn(httpService, 'get').mockReturnValue(
        of({ data: mockMoviesResponse }) as any
      );

      const result = await service.getPopularMovies();

      expect(result).toEqual(mockMoviesResponse);
      expect(httpService.get).toHaveBeenCalledWith(
        'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc',
        expect.objectContaining({
          params: {
            api_key: process.env.TMBD_API_KEY
          }
        })
      );
    });

    it('should throw ForbiddenException when API call fails', async () => {
      jest.spyOn(httpService, 'get').mockReturnValue(
        throwError(() => new Error('API Error'))
      );

      await expect(service.getPopularMovies()).rejects.toThrow(ForbiddenException);
    });
  });
});