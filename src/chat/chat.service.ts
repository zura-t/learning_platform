import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatRoom } from 'src/entity/chatRooms.entity';
import { Message } from 'src/entity/messages.entity';
import { User } from 'src/entity/users.entity';
import { DeepPartial, getConnection, In, Repository } from 'typeorm';
import { ChatGateway } from './chat.gateway';
import { MessageDto, RoomDto } from './dto/chat.dto';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(ChatRoom)
    private chatRoomRepository: Repository<ChatRoom>,
    @InjectRepository(Message) private messageRepository: Repository<Message>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async getRooms() {
    const rooms = await this.chatRoomRepository.find({ relations: ['users'] });
    return rooms;
  }

  async getMessages(room_id: number, users: number[]) {
    if (!room_id) {
      throw new NotFoundException({
        code: 'room.not-fond',
        message: 'Room not found',
      });
    }
    const messages = await this.messageRepository.find({
      where: { chat_id: room_id },
    });
    return messages;
  }

  async createMessage(messageDto: MessageDto) {
    const message = await this.messageRepository.save({...messageDto});
    
    const room = await this.chatRoomRepository.findOne(message.chat_id, {relations: ["messages"]});
    room.messages.push(message);

    await this.chatRoomRepository.save(room);

    const owner = await this.userRepository.findOne(message.owner, {relations: ["messages"]});
    const to_who = await this.userRepository.findOne(message.to_who, {relations: ["messages_to_me"]});

    owner.messages.push(message);
    to_who.messages_to_me.push(message);

    await this.userRepository.save([owner, to_who]);

    return message;
  }

  async createRoom(room: RoomDto) {
    try {
      const users = await this.userRepository.findByIds(room.users, {relations: ["chatRooms"]})

      // const roomExists = await this.chatRoomRepository.find({where: {users}, relations: ["users"]});
      // console.log(roomExists);
      
      // if (roomExists) {
      //   console.log('room already exists');
  
      //   throw new ConflictException({
      //     code: 'room.conflict',
      //     message: `The room already exists`,
      //   });
      // };
      
      const newRoom = await this.chatRoomRepository.save({ ...room, users });
      
      users.map((user) => (user.chatRooms.push(newRoom)));
      await this.userRepository.save(users)

      return newRoom;
    } catch (error) {
      console.log(error);
    }
  }
}
