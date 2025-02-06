import { ForbiddenException, Inject, Injectable, NotFoundException, Request, Scope } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Reservation } from './schemas/reservation.schemas';
import { Model } from 'mongoose';
import { User } from 'src/auth/schemas/user.schemas';
import { REQUEST } from '@nestjs/core';
import { catchError, firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import * as moment from 'moment-timezone';

@Injectable({ scope: Scope.REQUEST })
export class ReservationService {

    constructor(
        @InjectModel(Reservation.name)
        private reservationModel: Model<Reservation>,
        @InjectModel(User.name)
        private userModel: Model<User>,
        private http : HttpService,
        @Inject(REQUEST) private readonly request: Request
    ) {}
    
    async createReservation(reservationModel: Reservation, filmId: number,): Promise<{ dateSeance: Date, filmId: number, userInfos: User}>{
        const { dateSeance } = reservationModel;

        const userInfos = (this.request as any).user
        const reservation = await this.reservationModel.create({
            dateSeance,
            filmId,
            userInfos           
        });

        await this.userModel.findByIdAndUpdate(
            userInfos._id,
            {
                $push: { reservations: reservation._id }
            },
            { new: true }
        );
                
        return { dateSeance: dateSeance as any, filmId, userInfos}
    }

    async getReservationsByUserId(userId: string) {
        try {
            // Récupérer l'utilisateur avec ses réservations
            const user = await this.userModel
                .findById(userId)
                .populate('reservations')
                .exec();

            if (!user) {
                throw new Error('Utilisateur non trouvé');
            }

            // Récupérer les détails complets des réservations
            const reservationsWithMovies = await Promise.all(
                user.reservations.map(async (reservation: any) => {
                const { data } = await firstValueFrom(
                            this.http
                                .get(
                                    `https://api.themoviedb.org/3/movie/${reservation.filmId}&?api_key=${process.env.TMBD_API_KEY}&language=en-US`
                                )
                                .pipe(
                                    catchError(() => {
                                        throw new ForbiddenException('API not available');
                                    }),
                                ),
                            );
                            return {
                                reservationId: reservation._id,
                                dateSeance: reservation.dateSeance,
                                filmDetails: {
                                    id: data.id,
                                    title: data.title,
                                    genres: data.genres["name"],
                                    overview: data.overview,
                                    poster_path: process.env.TMBD_IMG_URL + data.poster_path,
                                    release_date: data.release_date
                                }
                            };
                })
            );

            return {
                userId: user._id,
                userName: user.name,
                reservations: reservationsWithMovies
            };

        } catch (error) {
            throw new Error(`Erreur lors de la récupération des réservations: ${error.message}`);
        }
    }

    async deleteReservation(reservationId: string, userId: string): Promise<{ message: string }> {
        // Vérifie si la réservation existe
        const reservation = await this.reservationModel.findById(reservationId);
        if (!reservation) {
            throw new NotFoundException("Reservation not found");
        }
    
        // Supprime la réservation de la base de données
        await this.reservationModel.findByIdAndDelete(reservationId);
    
        // Supprime la réservation de l'utilisateur
        await this.userModel.findByIdAndUpdate(userId, {
            $pull: { reservations: reservationId }
        });
    
        return { message: "Reservation successfully deleted" };
    }
    
    
}