import { IsNotEmpty } from '@nestjs/class-validator';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { Date } from 'mongoose';
import { User } from 'src/auth/schemas/user.schemas';

export class ReservationDto {

    @ApiProperty({ example: '2024-02-05 14:30', description: 'The date and hour of the seance' })
    @IsNotEmpty()
    @Transform(({ value }) => new Date(value))
    readonly dateSeance: Date;

    @ApiHideProperty()
    readonly filmId: number;

    @ApiHideProperty()
    readonly userInfos: User;
}