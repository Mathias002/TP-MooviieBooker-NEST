// import { Test, TestingModule } from '@nestjs/testing';
// import { ReservationController } from './reservation.controller';
// import { ReservationService } from './reservation.service';
// import { REQUEST } from '@nestjs/core';
// import * as moment from 'moment-timezone';

// describe('ReservationController', () => {
//   let controller: ReservationController;
//   let service: ReservationService;

//   const mockReservationService = {
//     createReservation: jest.fn(),
//     getReservationsByUserId: jest.fn(),
//     deleteReservation: jest.fn(),
//   };

//   const mockRequest = {
//     user: {
//       _id: {
//         _id: 'user123'
//       }
//     }
//   };

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [ReservationController],
//       providers: [
//         {
//           provide: ReservationService,
//           useValue: mockReservationService,
//         },
//         {
//           provide: REQUEST,
//           useValue: mockRequest,
//         }
//       ],
//     }).compile();

//     controller = module.get<ReservationController>(ReservationController);
//     service = module.resolve<ReservationService>(ReservationService) as any;
//   });

//   it('should be defined', () => {
//     expect(controller).toBeDefined();
//   });

//   describe('createReservation', () => {
//     const createReservationDto = {
//       dateSeance: moment().add(1, 'day').toDate(),
//       filmId: 1, // Ajoutez cette ligne
//       userInfos: mockRequest.user, // Ajoutez cette ligne
//     };

//     it('should create a reservation', async () => {
//       const mockResult = {
//         dateSeance: createReservationDto.dateSeance,
//         filmId: 1,
//         userInfos: mockRequest.user,
//       };

//       mockReservationService.createReservation.mockResolvedValue(mockResult);

//       const result = await controller.createReservation(1, createReservationDto);

//       expect(service.createReservation).toHaveBeenCalledWith(createReservationDto, 1);
//       expect(result).toEqual(mockResult);
//     });
//   });

//   describe('getReservationsByUserId', () => {
//     it('should fetch user reservations', async () => {
//       const mockReservations = {
//         userId: 'user123',
//         userName: 'Test User',
//         reservations: [],
//       };

//       mockReservationService.getReservationsByUserId.mockResolvedValue(mockReservations);

//       const result = await controller.getReservationsByUserId();

//       expect(service.getReservationsByUserId).toHaveBeenCalledWith('user123');
//       expect(result).toEqual(mockReservations);
//     });
//   });

//   describe('deleteReservation', () => {
//     it('should delete a reservation', async () => {
//       const mockResult = { message: "Reservation successfully deleted" };

//       mockReservationService.deleteReservation.mockResolvedValue(mockResult);

//       const result = await controller.deleteReservation('reservation123');

//       expect(service.deleteReservation).toHaveBeenCalledWith('reservation123', 'user123');
//       expect(result).toEqual(mockResult);
//     });
//   });
// });