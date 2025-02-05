import { IsEmail, IsNotEmpty, IsString, MinLength } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto {

    @ApiProperty({ example: 'Lala', description: 'User name' })
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @ApiProperty({ example: 'user@example.com', description: 'Email address' })
    @IsNotEmpty()
    @IsEmail({}, { message: "Please enter a correct email" })
    readonly email: string;

    @ApiProperty({ example: 'password123', description: 'Password' })
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    readonly password: string;

    @ApiProperty({ example: 'User', description: 'User role, by default = User' })
    @IsNotEmpty()
    @IsString()
    readonly roles: string;
}