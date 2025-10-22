// backend-nestjs/src/user/user.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(userDto: { name: string; email: string }): Promise<User> {
    const newUser = this.usersRepository.create(userDto);
    return this.usersRepository.save(newUser);
  }


  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    return user;
  }

 
  async update(
    id: number,
    userDto: { name?: string; email?: string },
  ): Promise<User> {
    
    const user = await this.findOne(id);

    
    Object.assign(user, userDto);

    
    return this.usersRepository.save(user);
  }

  
  async remove(id: number): Promise<void> {
    const result = await this.usersRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
  }
}
