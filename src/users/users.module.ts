import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from 'src/entity/roles.entity';
import { User } from 'src/entity/users.entity';
import { RolesService } from 'src/roles/roles.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, RolesService],
  imports: [
    TypeOrmModule.forFeature([User, Role])
  ],
  exports: [UsersService]
})
export class UsersModule {}