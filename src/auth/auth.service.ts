import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schemas';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs'
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>,
        private jwtService: JwtService
    ) {}


    async signUp(signUpDto: SignUpDto): Promise<{ token: string, name: string, email: string, roles: string, userId: string }>{
        const { name, email, password, roles } = signUpDto;

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await this.userModel.create({
            name,
            email,
            password: hashedPassword,
            roles
        });

        const token = this.jwtService.sign({ id: user._id })

        return { token, name, email, roles, userId: user._id.toString() }
    }

    async login(loginDto: LoginDto): Promise<{ token: string, userId: string }> {
        const { email, password } = loginDto;

        const user = await this.userModel.findOne({ email })

        if(!user) {
            throw new UnauthorizedException('Invalid email or password')
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password)

        if(!isPasswordMatched) {
            throw new UnauthorizedException('Invalid email or password')
        }

        const token = this.jwtService.sign({ id: user._id })

        return { token, userId: user._id.toString() }
    }
}
