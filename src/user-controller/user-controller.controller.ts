import { Controller, Get } from '@nestjs/common';
import { UserService } from '../user-service/user-service.service';

@Controller()
export class UserController {
  constructor(private readonly UserService: UserService) {}

  @Get()
  getHello(): string {
    return this.UserService.getHello();
  }

//   @Get('/auth/register')
  

//   @Get('/auth/login')
 
}
