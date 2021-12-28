import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "http";
import {Socket} from "socket.io"
import { ChatService } from "./chat.service";
import { MessageDto, RoomDto } from "./dto/chat.dto";

@WebSocketGateway({
  cors: {
    origin: '*'
  }
})
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly chatService: ChatService) {}

  handleConnection(socket: Socket): void {
    console.log('someone connected', socket.id);
  }

  @SubscribeMessage('first_message')
  async firstMessage(socket: Socket, data) {
      console.log('first message');
      
      const message: MessageDto = data.message;
      const roomDto: RoomDto = data.roomDto;
      const newRoom = await this.chatService.createRoom(roomDto);
      message.chat_id = newRoom.id;
      const newMessage = await this.chatService.createMessage(message);

      this.server.emit('first_message', newMessage, newRoom);
  }

  @SubscribeMessage('send_message')
  async handleMessage(@MessageBody('message') message: MessageDto) {
    console.log('new message');
    const newMessage = await this.chatService.createMessage(message);
    this.server.emit('send_message', newMessage);
  }
}