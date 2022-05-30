import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcryptjs';
import { User } from 'src/entities/user';
import { Repository } from 'typeorm';

@Injectable()
export class UserSeederService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createAdmin() {
    const admin = await this.userRepository.findOne({
      where: {
        login: 'admin',
      },
    });
    if (admin) {
      return null;
    }
    return this.userRepository.save({
      login: 'admin',
      password: await hash('adminadmin', 5),
      role: 'admin',
    });
  }
}
