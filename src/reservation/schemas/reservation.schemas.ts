import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { Date } from 'mongoose';
import { User } from '../../auth/schemas/user.schemas';


@Schema({
    timestamps: true,
})
export class Reservation {

    //clean supr *

    @Prop({ type: Date})
    dateSeance: Date;

    @Prop({ type: Number})
    filmId: number;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User;

}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);