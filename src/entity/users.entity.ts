import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { ChatRoom } from "./chatRooms.entity";
import { Message } from "./messages.entity";
import { Role } from "./roles.entity";

@Entity({name: 'users'})
export class User {
  @PrimaryGeneratedColumn({type: "int"})
  id: number;

  @Column({type: "text", unique: true})
  email: string;

  @Column({type: "text"})
  name: string;

  @Column({type: "text", nullable: true})
  password: string;
  
  @Column({type: "text"})
  role: string;

  @Column({type: "text", nullable: true})
  username: string;

  @Column({type: "text", nullable: true})
  phone: string;

  @Column({type: "text", nullable: true})
  day_of_birth: string;

  @Column({type: "text", nullable: true})
  nationality: string;

  @Column({type: "text", nullable: true})
  gender: string;

  @Column({type: "text", nullable: true})
  avatar: string;

  @Column({type: "text", nullable: true})
  bio: string;

  @Column({type: "text", array: true, nullable: true})
  languages: Array<string>;

  @Column({type: "text", nullable: true})
  favourite_music: string;

  @Column({type: "text", nullable: true})
  website: string;

  @Column({type: "text", array: true, nullable: true})
  social_links: {social_network: string, value: string}[];

  @Column({type: "text", array: true, nullable: true})
  notifications: {messages: boolean, homework: boolean, invoices: boolean}[];
  
  @Column({type: "text", nullable: true})
  storage_space: string;

  @Column({type: "text", nullable: true})
  used_space: string;

  @ManyToOne(() => Role, role => role.users)
  @JoinColumn({name: "role_id"})
  role_id: number;

  @ManyToMany(() => ChatRoom, chatRoom => chatRoom.users)
  chatRooms: ChatRoom[];

  @OneToMany(() => Message, message => message.owner)
  messages: Message[];

  @OneToMany(() => Message, message => message.to_who)
  messages_to_me: Message[];
}