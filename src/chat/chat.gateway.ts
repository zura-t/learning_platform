import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
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

  @SubscribeMessage('join room')
  async joinRoom(@ConnectedSocket() socket: Socket, @MessageBody() {chat_id}) {
    socket.join(String(chat_id));
  }

  @SubscribeMessage('send_message')
  async handleMessage(@ConnectedSocket() socket: Socket, @MessageBody('message') message: MessageDto) {
    console.log(socket.rooms);
    const newMessage = await this.chatService.createMessage(message);
    socket.broadcast.to(String(message.chat_id)).emit('send_message', {newMessage});
    socket.emit('send_message', {newMessage});
  }
}