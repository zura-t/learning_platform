import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { ChatRoom } from "./chatRooms.entity";
import { User } from "./users.entity";

@Entity({name: 'messages'})
export class Message {
  @PrimaryGeneratedColumn({type: "int"})
  id: number;

  @Column({type: "text"})
  message: string;

  @Column({type: "date"})
  date: Date;
  
  @Column({type: "time"})
  time: Date;

  @ManyToOne(() => User, user => user.messages)
  @JoinColumn({name: "owner"})
  owner: number;

  @ManyToOne(() => User, user => user.messages_to_me)
  @JoinColumn({name: "to_who"})
  to_who: number;

  @ManyToOne(() => ChatRoom, chatRoom => chatRoom.messages)
  @JoinColumn({name: "chat_id"})
  chat_id: number;
}