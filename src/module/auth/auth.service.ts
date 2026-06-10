import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { randomBytes } from 'crypto';
import { RegisterDto } from './dto/register.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { authResponseDto } from './dto/authResponse.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { loginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly jwtService: JwtService
    ) {}

    async register(registerDto: RegisterDto): Promise<authResponseDto> {
        const { email, password, firstName, lastName } = registerDto;
        
        // Use Type Casting to 'any' to bypass stale IDE / client compilation warnings
        const prisma = this.prismaService as any;

        const existingUser = await prisma.user.findUnique({
            where: { email },
        });
        if (existingUser) {
            throw new ConflictException('User already exists');
        }

        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await prisma.user.create({
                data: {
                    email,
                    password: hashedPassword,
                    firstName,
                    lastName,
                },
                select: {
                    id: true,
                    email: true,
                    firstName: true,
                    lastName: true,
                    role: true,
                    phoneNumber: true,
                    address: true,
                    bio: true,
                    profileImage: true,
                },
            });

            const tokens = await this.generateTokens(user.id, user.email);
            await this.updateRefreshToken(user.id, tokens.refreshToken);

            return {
                message: 'User registered successfully',
                accessToken: tokens.accessToken,
                refreshToken: tokens.refreshToken,
                user,
            };
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException('Failed to register user');
        }
    }

    private async generateTokens(userId: string, email: string): Promise<{ accessToken: string, refreshToken: string }> {
        const payload = { sub: userId, email };
        const refreshId = randomBytes(32).toString('hex');
        
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(payload, { 
                secret: process.env.JWT_SECRET || 'defaultsecret2026',
                expiresIn: '15m' 
            }),
            this.jwtService.signAsync({ id: userId, refreshId }, { 
                secret: process.env.JWT_REFRESH_SECRET || 'defaultrefreshsecret2026',
                expiresIn: '7d' 
            }),
        ]);

        return { accessToken, refreshToken };
    }

    async updateRefreshToken(userId: string, refreshToken: string) {
        const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
        const prisma = this.prismaService as any;
        await prisma.user.update({
            where: { id: userId },
            data: {
                refreshToken: hashedRefreshToken,
            },
        });
    }

    async refreshToken(userId: string): Promise<authResponseDto> {
        const prisma = this.prismaService as any;
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                role: true,
                refreshToken: true,
                phoneNumber: true,
                address: true,
                bio: true,
                profileImage: true,
            },
        });

        if (!user || !user.refreshToken) {
            throw new UnauthorizedException('Invalid refresh token');
        }

        const tokens = await this.generateTokens(user.id, user.email);
        await this.updateRefreshToken(user.id, tokens.refreshToken);

        return {
            message: 'Token refreshed successfully',
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
                phoneNumber: user.phoneNumber,
                address: user.address,
                bio: user.bio,
                profileImage: user.profileImage,
            },
        };
    }

    async logout(userId: string): Promise<void> {
        const prisma = this.prismaService as any;
        await prisma.user.update({
            where: { id: userId },
            data: {
                refreshToken: null,
            },
        });
    }

    async login(loginDto: loginDto): Promise<authResponseDto> {
        const { email, password } = loginDto;
        const prisma = this.prismaService as any;

        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            throw new UnauthorizedException('User not found');
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            throw new UnauthorizedException('Invalid password');
        }

        const tokens = await this.generateTokens(user.id, user.email);
        await this.updateRefreshToken(user.id, tokens.refreshToken);

        return {
            message: 'Login successful',
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
                phoneNumber: user.phoneNumber,
                address: user.address,
                bio: user.bio,
                profileImage: user.profileImage,
            },
        };
    }

    async getMe(userId: string) {
        const prisma = this.prismaService as any;
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                role: true,
                phoneNumber: true,
                address: true,
                bio: true,
                profileImage: true,
                createdAt: true,
                updatedAt: true,
            },
        });
        return user;
    }
}
