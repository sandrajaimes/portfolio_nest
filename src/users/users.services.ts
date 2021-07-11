import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersServices {

  constructor(@InjectRepository(User) private usersRepository: Repository<User>) {
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async add(data: User): Promise<User> {

    if (Object.keys(data).length === 0) {
      throw new BadRequestException('At least one field must be submitted');
    }

    if (!data.username || !data.password || !data.email) {
      throw new BadRequestException('The username, password and email is required');
    }

    const existUsername = await this.findByUsername(data.username);

    if (existUsername.length > 0) {
      throw new BadRequestException('The username is registered');
    }

    const existEmail = await this.findByEmail(data.email);

    if (existEmail.length > 0) {
      throw new BadRequestException('The email is registered');
    }

    const user = this.usersRepository.create(data);
    await this.usersRepository.save(user);
    return user;
  }

  async findById(id: number): Promise<User[]> {
    return await this.usersRepository.find({ id });
  }

  async findByUsername(username: string): Promise<User[]> {
    return await this.usersRepository.find({ username });
  }

  async findByEmail(email: string): Promise<User[]> {
    return await this.usersRepository.find({ email });
  }

  async update(id: number, data: User) {

    if (!id) {
      throw new BadRequestException(`The id is required`);
    }

    if (Object.keys(data).length === 0) {
      throw new BadRequestException('At least one field must be submitted');
    }

    const existUser = await this.findById(id);

    if (existUser.length === 0) {
      throw new BadRequestException(`The user with id:${id} dont exist`);
    }

    const userUpdated = await this.usersRepository.update(id, data);

    return { updatedId: id };
  }

  async remove(id: number): Promise<object> {
    if (!id) {
      throw new BadRequestException(`The id is required`);
    }

    const existUser = await this.findById(id);

    if (existUser.length === 0) {
      throw new BadRequestException(`The user with id:${id} dont exist`);
    }

    const userDeleted = await this.usersRepository.delete(id);

    return { deletedId: id };
  }
}