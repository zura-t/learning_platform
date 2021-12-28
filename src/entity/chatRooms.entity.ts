import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { Message } from "./messages.entity";
import { User } from "./users.entity";

@Entity({name: 'chatRooms'})
export class ChatRoom {
  @PrimaryGeneratedColumn({type: "int"})
  id: number;

  @ManyToMany(() => User, user => user.chatRooms)
  @JoinTable({name: 'chatRooms_users'})
  users: User[];

  @OneToMany(() => Message, message => message.chat_id)
  messages: Message[];
}