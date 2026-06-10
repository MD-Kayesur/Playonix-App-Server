import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PrismaService } from "../../../prisma/prisma.service";
import { Request } from "express";
import * as bcrypt from 'bcrypt';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
    constructor(private prisma: PrismaService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_REFRESH_SECRET || 'defaultrefreshsecret2026',
            passReqToCallback: true,
        });
    }

    async validate(req: Request, payload: { id: string, email: string }) {
        const authHeader = req.get('Authorization');
        if (!authHeader) {
            throw new UnauthorizedException('Authorization header not found');
        }
        const refreshToken = authHeader.replace('Bearer', '').trim();
        if (!refreshToken) {
            throw new UnauthorizedException('Refresh token not found');
        }

        const user = await this.prisma.user.findUnique({
            where: { id: payload.id },
            select: {
                id: true,
                email: true,
                role: true,
                refreshToken: true,
            }
        });
        if (!user || !user.refreshToken) {
            throw new UnauthorizedException();
        }

        const refreshTokenMatch = await bcrypt.compare(refreshToken, user.refreshToken);
        if (!refreshTokenMatch) {
            throw new UnauthorizedException('Invalid refresh token');
        }

        return {
            id: user.id,
            email: user.email,
            role: user.role,
        };
    }
}
