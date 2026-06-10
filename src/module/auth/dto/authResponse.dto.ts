import { UserRole } from "@prisma/client";

export class authResponseDto {
    accessToken: string;
    refreshToken: string;
    message: string;
    user: {
        email: string;
        role: UserRole;
        id: string;
        firstName: string | null;
        lastName: string | null;
        phoneNumber: string | null;
        address: string | null;
        bio: string | null;
        profileImage: string | null;
    };
}
