import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user';
import { UserSeederService } from './users/user.service';

@Injectable()
export class Seeder {
  constructor(
    private readonly logger: Logger,
    private userSeederService: UserSeederService,
  ) {}

  async seed() {
    try {
      const admin = await this.userSeederService.createAdmin();
      if (admin) {
        this.logger.log('Ok');
      } else {
        this.logger.warn('Admin exist');
      }
    } catch (error) {
      this.logger.error('error', error.message);
    }
  }
}
