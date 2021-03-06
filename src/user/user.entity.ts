import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { UserRo } from './user-ro';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  created: Date;

  @Column({
    type: 'text',
    unique: true,
  })
  username: string;

  @Column('text')
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async comparePassword(attempt: string) {
    return await bcrypt.compare(attempt, this.password);
  }

  toResponseObject(showToken: boolean = true): UserRo {
    const { id, created, username } = this;
    const result: UserRo = { id, created, username };

    if (showToken) {
      result.token = this.token;
    }
    return result;
  }

  private get token(): string {
    const { id, username } = this;

    return jwt.sign(
      { id, username },
      process.env.SECRET,
      { expiresIn: '7d' },
    );
  }
}
