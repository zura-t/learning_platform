import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { Public } from 'src/auth/decorators/public.decorator';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
import { RoomDto } from './dto/chat.dto';

@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService, private chatGateway: ChatGateway) {}

  @Public()
  @Get('rooms')
  getRooms() {
    try {
      return this.chatService.getRooms();
    } catch (e) {
      throw e;
    }
  }

  @Public()
  @Get(':roomId')
  getMessages(@Param('roomId') roomId: number, @Query() query) {
    const {usersId} = query
    const messages = this.chatService.getMessages(roomId, usersId);
    return messages;
  }
}
