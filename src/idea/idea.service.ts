import { Injectable } from '@nestjs/common';
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
    return await this.repository.findOne({
      where: { id },
    });
  }
  // Partial - type that allows to get object but not the entire object
  async update(id: string, data: Partial<IdeaDto>) {
    await this.repository.update({ id }, data);
    return await this.repository.findOne({ id });
  }

  async destroy(id: string) {
    await this.repository.delete({ id });
    return { deleted: true };
  }
}
