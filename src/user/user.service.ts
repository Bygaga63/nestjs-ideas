import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserDto } from './user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { UserRo } from './user-ro';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {
  }

  async showAll(): Promise<UserRo[]> {
    const users = await this.repository.find();
    return users.map(user => user.toResponseObject(false));
  }

  async findOne(username: string): Promise<UserEntity> {
    return await this.repository.findOne({
      where: {
        username,
      },
    });
  }

  async login(data: UserDto): Promise<UserRo> {
    const { username, password } = data;
    const user: UserEntity = await this.findOne(username);
    if (!user || !(await user.comparePassword(password))) {
      throw new HttpException('Invalid username/password', HttpStatus.BAD_REQUEST);
    }

    return user.toResponseObject();
  }

  async register(data: UserDto): Promise<UserRo> {
    const { username } = data;
    let user: UserEntity = await this.findOne(username);

    if (user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    user = await this.repository.create(data);
    await this.repository.save(user);
    return user.toResponseObject();
  }
}
