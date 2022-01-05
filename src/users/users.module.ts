import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Role } from 'src/entity/roles.entity';
import { User } from 'src/entity/users.entity';
import { FilesModule } from 'src/files/files.module';
import { RolesService } from 'src/roles/roles.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, RolesService],
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([User, Role]),
    FilesModule
  ],
  exports: [UsersService]
})
export class UsersModule {}