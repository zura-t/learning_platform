import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { Public } from 'src/decorators/public.decorator';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
import { MessageDto, RoomDto } from './dto/chat.dto';

@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}

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
  getMessages(@Param('roomId') roomId: number) {
    const messages = this.chatService.getMessages(roomId);
    return messages;
  }

  @Public()
  @Post('createRoom')
  createRoom(@Body('roomDto') roomDto: RoomDto) {
    return this.chatService.createRoom(roomDto);
  }

  @Post('createMessage')
  createMessage(@Body('messageDto') messageDto: MessageDto) {
    return this.chatService.createMessage(messageDto);
  }
}
