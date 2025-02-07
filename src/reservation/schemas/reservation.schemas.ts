import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose from 'mongoose';
import { User } from '../../auth/schemas/user.schemas';


@Schema({
    timestamps: true,
})
export class Reservation {

    @Prop({ type: String })
    dateSeance: String;

    @Prop({ type: Number })
    filmId: number;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    userInfos: User;

}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);