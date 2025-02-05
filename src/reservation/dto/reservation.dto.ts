import { IsEmail, IsNotEmpty, IsString, IsDate } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { User } from 'src/auth/schemas/user.schemas';

export class ReservationDto {

    @ApiProperty({ example: '23/03/2025', description: 'The date of the seance' })
    @IsNotEmpty()
    @IsDate()
    readonly dateSeance: Date;

    @ApiProperty({ example: '12', description: 'The ID of the client concerned by the reservation' })
    @IsNotEmpty()
    @IsNumber()
    readonly filmId: number;

    @ApiProperty({ description: 'The client infos concerned by the reservation' })
    readonly user: User;
}