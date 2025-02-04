import { Test, TestingModule } from '@nestjs/testing';
import { MoviesApiService } from './movies-api.service';

describe('MoviesApiService', () => {
  let service: MoviesApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesApiService],
    }).compile();

    service = module.get<MoviesApiService>(MoviesApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
