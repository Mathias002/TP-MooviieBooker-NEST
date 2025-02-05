import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Reservation } from './schemas/reservation.schemas';
import { Model } from 'mongoose';
import { User } from 'src/auth/schemas/user.schemas';

@Injectable()
export class ReservationService {

    
    constructor(
        @InjectModel(Reservation.name)
        private reservationModel: Model<Reservation>,
    ) {}
    
    
    async createReservation(reservationModel: Reservation): Promise<{ dateSeance: Date, filmId: number}>{
        const { dateSeance, filmId } = reservationModel;
        
        const reservation = await this.reservationModel.create({
            dateSeance,
            filmId,
            
            
        });
                
        return { dateSeance: dateSeance as any, filmId, }
    }
    
}