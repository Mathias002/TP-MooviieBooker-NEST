import { IsNotEmpty, IsString } from '@nestjs/class-validator';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { Date } from 'mongoose';
import { User } from '../../auth/schemas/user.schemas';
import * as moment from 'moment-timezone';

export class ReservationDto {

    @ApiProperty({ example: '2024-02-05 14:30', description: 'The date and hour of the seance' })
    @IsNotEmpty()
    @IsString()
    readonly dateSeance: String;

    @ApiHideProperty()
    readonly filmId: number;

    @ApiHideProperty()
    readonly userInfos: User;
}