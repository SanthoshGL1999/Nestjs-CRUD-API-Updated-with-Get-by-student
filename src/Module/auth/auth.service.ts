import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Users } from '../user/entities/user.entity';


@Injectable()
export class AuthService {
  constructor(@InjectRepository(Users) private userRepository: Repository<Users>,
              private jwtService: JwtService
  ){}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userRepository.findOne({where:{username}});
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(username: string,pass: string): Promise<Users>{
    const hashPassword= await bcrypt.hash(pass, 10);
    const newUser= this.userRepository.create({username, password: hashPassword});
    return this.userRepository.save(newUser);
  }
}