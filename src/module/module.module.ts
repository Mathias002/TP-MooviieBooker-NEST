import { Module } from '@nestjs/common';
import { UserController } from '../user-controller/user-controller.controller';
import { UserService } from '../user-service/user-service.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService],
})
export class AppModule {}
