import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationDto } from '../reservation/dto/reservation.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Create reservation')
@Controller('reservation')
export class ReservationController {

    constructor(private reservationService: ReservationService) { }
    
    @ApiOperation({ summary: 'Create a reservation as a client' })
    @ApiResponse({ status: 200, description: 'reservation successfully create' })
    @ApiResponse({ status: 401, description: 'reservation failed' })
    @ApiBearerAuth()
    @ApiBody({ type: ReservationDto }) 
    @Post('/:idFilm')
    @UseGuards(AuthGuard())
    async createReservation(@Param('idFilm') param: number, @Body() reservationModel: ReservationDto) {
        // return this.reservationService.createReservation()
    }
}