import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { ChatRoom } from 'src/entity/chatRooms.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from 'src/entity/messages.entity';
import { User } from 'src/entity/users.entity';

@Module({
  controllers: [ChatController],
  providers: [ChatService, ChatGateway],
  imports: [
    TypeOrmModule.forFeature([ChatRoom, Message, User])
  ]
})
export class ChatModule {}