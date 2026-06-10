import { Controller, Get, Post, Body, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { authResponseDto } from './dto/authResponse.dto';
import { RefreshTokenGuard } from './guards/refresh-token.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { GetUser } from './decorators/get-user.decorator';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { loginDto as LoginDto } from './dto/login.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Register User',
    description: 'Register a new user',
  })
  @ApiResponse({
    status: 201,
    description: 'User registered successfully',
    type: authResponseDto,
  })
  async register(@Body() registerDto: RegisterDto): Promise<authResponseDto> {
    console.log('registerDto', registerDto);
    return this.authService.register(registerDto);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RefreshTokenGuard)
  @ApiOperation({
    summary: 'Refresh Access Token',
    description: 'Refresh the access token using a valid refresh token',
  })
  @ApiResponse({
    status: 200,
    description: 'Access token refreshed successfully',
    type: authResponseDto,
  })
  async refresh(@GetUser('id') userId: string): Promise<authResponseDto> {
    return this.authService.refreshToken(userId);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Logout User',
    description: 'Logout current user and invalidate their refresh token',
  })
  async logout(@GetUser('id') userId: string): Promise<{ message: string }> {
    await this.authService.logout(userId);
    return { message: 'Logout successful' };
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Login User',
    description: 'Login user with email and password credentials',
  })
  @ApiResponse({
    status: 200,
    description: 'User logged in successfully',
    type: authResponseDto,
  })
  async login(@Body() loginDto: LoginDto): Promise<authResponseDto> {
    return await this.authService.login(loginDto);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Get Current User',
    description: 'Retrieve details of the currently authenticated user profile',
  })
  async getMe(@GetUser('id') userId: string) {
    return this.authService.getMe(userId);
  }
}
