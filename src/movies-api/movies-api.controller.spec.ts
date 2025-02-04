import { Test, TestingModule } from '@nestjs/testing';
import { MoviesApiController } from './movies-api.controller';

describe('MoviesApiController', () => {
  let controller: MoviesApiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoviesApiController],
    }).compile();

    controller = module.get<MoviesApiController>(MoviesApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
