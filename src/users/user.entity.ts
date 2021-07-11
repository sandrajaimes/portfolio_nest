import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum UserRole {
  'admin' = 'admin',
  'editor' = 'editor'
}

export enum UserStatus {
  'active' = 'active',
  'inactive' = 'inactive'
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  last_name: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column({ default: 'editor' })
  role: UserRole;

  @Column('text')
  about_me: string;

  @Column({ default: 'active' })
  status: UserStatus;

}