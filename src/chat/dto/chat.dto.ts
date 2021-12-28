import { IsNotEmpty } from "class-validator";

export interface MessageEventDto extends MessageDto {
  id: number;
  socketId?: string;
  avatar: string;
}

export interface MessageDto {
  message: string;
  date: Date;
  time: Date;
  owner: number;
  to_who: number;
  chat_id?: number;
}

export interface ChatDto extends MessageDto {
  id: number;
  socketId?: number;
  avatar: string;
}

export interface Participant {
  roomId: number;
  username: string;
  avatar: string;
  connected: boolean;
}

export class RoomDto {
  id: number;
  messages?: any[];
  users: any[];
}