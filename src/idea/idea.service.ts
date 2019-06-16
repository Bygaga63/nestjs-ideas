import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { IdeaEntity } from './idea.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IdeaDto } from './idea.dto';

@Injectable()
export class IdeaService {
  constructor(
    @InjectRepository(IdeaEntity)
    private repository: Repository<IdeaEntity>,
  ) {
  }

  async showAll(): Promise<IdeaEntity[]> {
    // find() mean findAll()
    return await this.repository.find();
  }

  async createIdea(data: IdeaDto): Promise<IdeaEntity> {
    const idea = await this.repository.create(data);
    await this.repository.save(idea);
    return idea;
  }

  async read(id: string) {
    const idea = await this.repository.findOne({
      where: { id },
    });
    this.checkIdeaExist(idea);
    return idea;
  }

  // repository.update retrun db information
  // repository.save return only object_id O_o
  // Partial - type that allows to get object but not the entire object
  async update(id: string, data: Partial<IdeaDto>) {
    await this.read(id);
    await this.repository.update({ id }, data);
    return await this.read(id);
  }

  async destroy(id: string) {
    await this.read(id);
    await this.repository.delete({ id });
    return { deleted: true };
  }

  private checkIdeaExist(idea: IdeaEntity) {
    if (!idea) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }
}
