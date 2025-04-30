import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserRepository } from '../repos/user.repo';
import { Role } from '../../utils/enums/role.enum';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminSeeder {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly configService: ConfigService,
  ) {}

  async seed() {
    const adminEmail = this.configService.get<string>('ADMIN_EMAIL');
    const adminPassword = this.configService.get<string>('ADMIN_PASSWORD');
    const adminName = this.configService.get<string>('ADMIN_NAME');

    if (!adminEmail || !adminPassword || !adminName) {
      console.error('Admin credentials not found in .env file');
      return;
    }

    const existingAdmin = await this.userRepository.findOneBy({
      email: adminEmail,
    });
    if (existingAdmin) {
      console.log('Admin user already exists');
      return;
    }

    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    await this.userRepository.create({
      email: adminEmail,
      password: hashedPassword,
      name: adminName,
      role: Role.ADMIN,
    });

    console.log('Admin user created successfully');
  }
}
