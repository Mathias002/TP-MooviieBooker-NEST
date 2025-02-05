import { Module } from '@nestjs/common';
import { ReservationController } from './reservation.controller';
import { ReservationService } from './reservation.service';
import { HttpModule } from '@nestjs/axios';
import { AuthModule } from 'src/auth/auth.module';
import { ReservationSchema } from './schemas/reservation.schemas';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
      HttpModule,
      AuthModule,
      MongooseModule.forFeature([{ name: 'Reservation', schema: ReservationSchema }]),
    ],
  controllers: [ReservationController],
  providers: [ReservationService]
})
export class ReservationModule {}
