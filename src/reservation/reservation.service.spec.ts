import { Test, TestingModule } from '@nestjs/testing';
import { ReservationService } from './reservation.service';
import { getModelToken } from '@nestjs/mongoose';
import { HttpService } from '@nestjs/axios';
import { REQUEST } from '@nestjs/core';
import { Model } from 'mongoose';
import { Reservation } from './schemas/reservation.schemas';
import { User } from '../auth/schemas/user.schemas';
import { NotFoundException } from '@nestjs/common';
import { of } from 'rxjs';
import * as moment from 'moment-timezone';

describe('ReservationService', () => {
  let service: ReservationService;
  let reservationModel: Model<Reservation>;
  let userModel: Model<User>;
  let httpService: HttpService;

  const mockReservationModel = {
    create: jest.fn(),
    findById: jest.fn(),
    findByIdAndDelete: jest.fn(),
  };

  const mockUserModel = {
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
  };

  const mockHttpService = {
    get: jest.fn(),
  };

  const mockRequest = {
    user: {
      _id: 'user123',
      name: 'Test User',
    },
  };

  const mockMovieData = {
    data: {
      id: 1,
      title: 'Test Movie',
      genres: [{ name: 'Action' }],
      overview: 'Test overview',
      poster_path: '/poster.jpg',
      release_date: '2024-01-01',
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReservationService,
        {
          provide: getModelToken(Reservation.name),
          useValue: mockReservationModel,
        },
        {
          provide: getModelToken(User.name),
          useValue: mockUserModel,
        },
        {
          provide: HttpService,
          useValue: mockHttpService,
        },
        {
          provide: REQUEST,
          useValue: mockRequest,
        },
      ],
    }).compile();

    service = module.resolve<ReservationService>(ReservationService) as any;
    reservationModel = module.get<Model<Reservation>>(getModelToken(Reservation.name));
    userModel = module.get<Model<User>>(getModelToken(User.name));
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createReservation', () => {
    const createReservationDto = {
      dateSeance: moment().add(1, 'day').toDate(),
      filmId: 1,
    };

    it('should create a reservation successfully', async () => {
      const mockReservation = {
        _id: 'reservation123',
        ...createReservationDto,
        userInfos: mockRequest.user,
      };

      mockReservationModel.create.mockResolvedValue(mockReservation);
      mockUserModel.findByIdAndUpdate.mockResolvedValue({});

      const result = await service.createReservation(createReservationDto as any, 1);

      expect(mockReservationModel.create).toHaveBeenCalledWith({
        dateSeance: createReservationDto.dateSeance,
        filmId: 1,
        userInfos: mockRequest.user,
      });
      expect(mockUserModel.findByIdAndUpdate).toHaveBeenCalled();
      expect(result).toEqual({
        dateSeance: createReservationDto.dateSeance,
        filmId: 1,
        userInfos: mockRequest.user,
      });
    });
  });

  describe('getReservationsByUserId', () => {
    it('should fetch user reservations with movie details', async () => {
      const mockUser = {
        _id: 'user123',
        name: 'Test User',
        reservations: [
          { _id: 'reservation1', filmId: 1, dateSeance: new Date() },
        ],
      };

      mockUserModel.findById.mockReturnValue({
        populate: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValue(mockUser),
        }),
      });

      mockHttpService.get.mockReturnValue(
        of(mockMovieData) as any
      );

      const result = await service.getReservationsByUserId('user123');

      expect(result).toEqual({
        userId: 'user123',
        userName: 'Test User',
        reservations: [
          expect.objectContaining({
            reservationId: 'reservation1',
            filmDetails: expect.objectContaining({
              title: 'Test Movie',
            }),
          }),
        ],
      });
    });
  });

  describe('deleteReservation', () => {
    it('should delete a reservation successfully', async () => {
      const mockReservation = { _id: 'reservation123', filmId: 1 };

      mockReservationModel.findById.mockResolvedValue(mockReservation);
      mockReservationModel.findByIdAndDelete.mockResolvedValue(mockReservation);
      mockUserModel.findByIdAndUpdate.mockResolvedValue({});

      const result = await service.deleteReservation('reservation123', 'user123');

      expect(mockReservationModel.findById).toHaveBeenCalledWith('reservation123');
      expect(mockReservationModel.findByIdAndDelete).toHaveBeenCalledWith('reservation123');
      expect(mockUserModel.findByIdAndUpdate).toHaveBeenCalledWith('user123', {
        $pull: { reservations: 'reservation123' },
      });
      expect(result).toEqual({ message: "Reservation successfully deleted" });
    });

    it('should throw NotFoundException if reservation does not exist', async () => {
      mockReservationModel.findById.mockResolvedValue(null);

      await expect(service.deleteReservation('reservation123', 'user123'))
        .rejects.toThrow(NotFoundException);
    });
  });
});