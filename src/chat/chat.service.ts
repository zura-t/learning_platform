import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatRoom } from 'src/entity/chatRooms.entity';
import { Message } from 'src/entity/messages.entity';
import { User } from 'src/entity/users.entity';
import { DeepPartial, getConnection, getManager, In, Repository } from 'typeorm';
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

  async getMessages(room_id: number) {
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
    const room = await this.chatRoomRepository.findOne(messageDto.chat_id, {relations: ["users", "messages"]});
    if (!room) {
      throw new ConflictException({
        message: "The room doesn't exists"
      });
    }
    let roomContainsUsers = true;
    room.users.forEach(user => {
      if (user.id !== messageDto.owner && user.id !== messageDto.to_who) {
        roomContainsUsers = false;
      }
    })
    if (!roomContainsUsers) {
      throw new ConflictException({
        message: 'Some id is wrong'
      });
    }
    
    const message = await this.messageRepository.save({...messageDto});
    
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
      const users = await this.userRepository.findByIds(room.users, {relations: ["chatRooms"]});

      if (users.length !== 2) {
        throw new ConflictException({
          message: `User not found`,
        });
      };

      const roomExists = await getManager().query(
        `SELECT cu."chatRoomsId" FROM "chatRooms_users" cu 
        left join users on users.id=cu."usersId" 
        where users.id IN (${room.users[0]}, ${room.users[1]})
        GROUP BY cu."chatRoomsId"
        HAVING COUNT(*) = 2`
      );
      
      if (roomExists.length) {
        throw new ConflictException({
          code: 'room.conflict',
          message: `The room already exists`,
        });
      };
      
      const newRoom = await this.chatRoomRepository.save({ ...room, users });

      return newRoom;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteAllRooms() {
    const users = await this.userRepository.find();
    users.map(user => user.chatRooms = []);
    await this.userRepository.save(users);
    return 'rooms deleted';
  }
}
