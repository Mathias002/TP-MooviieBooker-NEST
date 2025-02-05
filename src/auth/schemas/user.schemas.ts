import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { ROLES } from '../../constant/api.enums';
import mongoose, { Date } from 'mongoose';
import { Reservation } from '../../reservation/schemas/reservation.schemas';

@Schema({
    timestamps: true,
})
export class User {
    
    @Prop()
    name: string;

    @Prop({ unique: [true, 'Duplicate email entered'] })
    email: string;

    @Prop()
    password: string;

    @Prop({ type: String, default: ROLES.USER })
    roles: string;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reservation' }] })
    reservations: Reservation[];

}

export const UserSchema = SchemaFactory.createForClass(User);