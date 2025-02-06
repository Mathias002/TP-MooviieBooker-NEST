import { Test, TestingModule } from '@nestjs/testing';
import { MoviesApiController } from './movies-api.controller';
import { MoviesApiService } from './movies-api.service';
import { AuthGuard } from '@nestjs/passport';

describe('MoviesApiController', () => {
  let controller: MoviesApiController;
  let service: MoviesApiService;

  const mockMoviesService = {
    getPopularMovies: jest.fn()
  };

  const mockAuthGuard = {
    canActivate: jest.fn().mockReturnValue(true)
  };

  const mockMoviesResponse = {
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
      controllers: [MoviesApiController],
      providers: [
        {
          provide: MoviesApiService,
          useValue: mockMoviesService
        },
        {
          provide: AuthGuard,
          useValue: mockAuthGuard
        }
      ]
    }).compile();

    controller = module.get<MoviesApiController>(MoviesApiController);
    service = module.get<MoviesApiService>(MoviesApiService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getPopularMovies', () => {
    beforeEach(() => {
      mockMoviesService.getPopularMovies.mockResolvedValue(mockMoviesResponse);
    });

    it('should return filtered and transformed movies', async () => {
      // Mock global fetch for genre conversion
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ 
          genres: [
            { id: 28, name: 'Action' },
            { id: 12, name: 'Adventure' }
          ] 
        })
      });

      const result = await controller.getPopularMovies();

      expect(result).toEqual(expect.arrayContaining([
        expect.objectContaining({
          id: 1,
          title: 'Test Movie',
          genres: ['Action', 'Adventure'],
          poster_url: 'https://image.tmdb.org/t/p/w500/poster.jpg',
          backdrop_url: 'https://image.tmdb.org/t/p/w500/backdrop.jpg'
        })
      ]));
    });
  });

  describe('getFilteredPopularMovies', () => {
    const mockFilteredMovies = [
      {
        id: 1,
        title: 'Test Movie',
        original_title: 'Test Movie Original',
        overview: 'A test movie overview'
      }
    ];

    beforeEach(() => {
      mockMoviesService.getPopularMovies.mockResolvedValue(mockMoviesResponse);
      
      // Mock global fetch for genre conversion
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ 
          genres: [
            { id: 28, name: 'Action' },
            { id: 12, name: 'Adventure' }
          ] 
        })
      });
    });

    it('should filter movies based on search parameter', async () => {
      const result = await controller.getFilteredPopularMovies('test');

      expect(result).toEqual(expect.arrayContaining([
        expect.objectContaining({
          title: 'Test Movie'
        })
      ]));
    });
  });
});