import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectModel } from '@nestjs/mongoose';
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { Model } from "mongoose";
import { User } from "./schemas/user.schemas";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
        configService: ConfigService,
        @InjectModel(User.name)
        private userModel: Model<User>
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get<string>('JWT_SECRET', 'default_secret'),
        })
    }

    async validate(payload) {
        const { id } = payload;

        const user = await this.userModel.findById(id);

        if(!user) {
            throw new UnauthorizedException('Login first to acces this endpoint.')
        }

        return user;
    }

    
}

// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy) {
//     constructor(configService: ConfigService) {
//     console.log('JWT_SECRET', configService.get('JWT_SECRET'));
//     super({
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       ignoreExpiration: false,
//       secretOrKey: configService.get('JWT_SECRET', 'default_secret'),
//     });
//   }

//   async validate(payload: any) {
//     return { id: payload.sub, email: payload.email, role: payload.role };
//   }
// }