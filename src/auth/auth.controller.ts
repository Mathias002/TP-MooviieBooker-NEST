import { Controller, Body, Post, Get } from '@nestjs/common';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { sign } from 'crypto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor( private authService: AuthService) {}

    @ApiOperation({ summary: 'User creation' })
    @ApiResponse({ status: 200, description: 'Successful creation' }) 
    @ApiResponse({ status: 401, description: 'Failure to create' }) 
    @ApiBody({ type: SignUpDto }) 
    @Post('/signup')
    signUp(@Body() signUpDto: SignUpDto): Promise<{ token: string, name: string, email: string}> {
        return this.authService.signUp(signUpDto);
    }

    @ApiOperation({ summary: 'User authentication' })
    @ApiResponse({ status: 200, description: 'Successful authentication' }) 
    @ApiResponse({ status: 401, description: 'Authentication failure' }) 
    @ApiBody({ type: LoginDto }) 
    @Post('/login')
    login(@Body() loginDto: LoginDto): Promise<{ token: string}> {
        return this.authService.login(loginDto);
    }
}
