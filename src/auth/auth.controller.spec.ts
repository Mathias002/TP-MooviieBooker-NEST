import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { UnauthorizedException } from '@nestjs/common';

// Mock AuthService
const mockAuthService = {
  signUp: jest.fn(),
  login: jest.fn(),
};

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  describe('signUp', () => {
    it('should call authService.signUp and return token, name, email, roles, and userId', async () => {
      const signUpDto: SignUpDto = { 
        name: 'John Doe', 
        email: 'john@example.com', 
        password: 'securePass',
        roles: 'user'
      };

      const result = { 
        token: 'mockToken', 
        name: signUpDto.name, 
        email: signUpDto.email, 
        roles: signUpDto.roles,
        userId: 'mockUserId'
      };

      jest.spyOn(authService, 'signUp').mockResolvedValue(result);

      expect(await authController.signUp(signUpDto)).toEqual(result);
      expect(authService.signUp).toHaveBeenCalledWith(signUpDto);
    });
  });

  describe('login', () => {
    it('should call authService.login and return token and userId', async () => {
      const loginDto: LoginDto = { email: 'john@example.com', password: 'securePass' };
      const result = { token: 'mockToken', userId: 'mockUserId' };

      jest.spyOn(authService, 'login').mockResolvedValue(result);

      expect(await authController.login(loginDto)).toEqual(result);
      expect(authService.login).toHaveBeenCalledWith(loginDto);
    });

    it('should throw an UnauthorizedException when login fails', async () => {
      const loginDto: LoginDto = { email: 'john@example.com', password: 'wrongPass' };

      jest.spyOn(authService, 'login').mockRejectedValue(new UnauthorizedException('Invalid email or password'));

      await expect(authController.login(loginDto)).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('getProfile', () => {
    it('should return the user from the request object', () => {
      const req = { user: { id: 'mockUserId', name: 'John Doe', email: 'john@example.com', roles: 'user' } };

      expect(authController.getProfile(req)).toEqual(req.user);
    });
  });
});
