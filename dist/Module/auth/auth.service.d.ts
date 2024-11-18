import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { Users } from '../user/entities/user.entity';
export declare class AuthService {
    private userRepository;
    private jwtService;
    constructor(userRepository: Repository<Users>, jwtService: JwtService);
    validateUser(username: string, pass: string): Promise<any>;
    login(user: any): Promise<{
        access_token: string;
    }>;
    register(username: string, pass: string): Promise<Users>;
}
