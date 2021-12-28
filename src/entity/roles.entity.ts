import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';
import { User } from './users.entity';

@Entity({ name: 'roles' })
export class Role {
  @PrimaryGeneratedColumn({type: "int"})
  id: number;

  @Column({ type: 'text', unique: true })
  value: string;

  @Column({ type: 'text', array: true })
  availability: Array<string>;

  @OneToMany(() => User, user => user.role_id)
  users: User[];
}