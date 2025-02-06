import { Body, Controller, Delete, Get, Inject, Param, Post, Request, UseGuards } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationDto } from '../reservation/dto/reservation.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { REQUEST } from '@nestjs/core';

@ApiTags('Create reservation')
@Controller('reservation')
export class ReservationController {

    constructor(
        private reservationService: ReservationService,
        @Inject(REQUEST) private readonly request: Request
    ) { }
    
    @ApiOperation({ summary: 'Create a reservation as a client' })
    @ApiResponse({ status: 200, description: 'reservation successfully create' })
    @ApiResponse({ status: 401, description: 'reservation failed' })
    @ApiBearerAuth()
    @ApiBody({ type: ReservationDto }) 
    @Post('/:idFilm')
    @UseGuards(AuthGuard())
    async createReservation(@Param('idFilm') idFilm: number, @Body() reservationModel: ReservationDto) {
        return this.reservationService.createReservation(reservationModel, idFilm)  
    }

    @ApiOperation({ summary: 'Display all bookings of a client' })
    @ApiResponse({ status: 200, description: 'Successful booking recovery' })
    @ApiResponse({ status: 401, description: 'Reservation booking failed' })
    @ApiBearerAuth()
    @Get('/my_reservation')
    @UseGuards(AuthGuard())
    async getReservationsByUserId() {
        const userInfos = (this.request as any).user._id
        return this.reservationService.getReservationsByUserId(userInfos._id);
    }

    @ApiOperation({ summary: 'Delete a bookings with id' })
    @ApiResponse({ status: 200, description: 'Successfuly delete booking' })
    @ApiResponse({ status: 401, description: 'Failed to delete booking' })
    @ApiBearerAuth()
    @Delete('/my_reservation/delete/:idReservation')
    @UseGuards(AuthGuard())
    async deleteReservation(@Param('idReservation') idReservation: string): Promise<{ message: string }> {
        const userInfos = (this.request as any).user._id
        return this.reservationService.deleteReservation(idReservation, userInfos._id);
    }

}