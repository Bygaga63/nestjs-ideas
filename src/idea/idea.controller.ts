import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { IdeaService } from './idea.service';
import { IdeaDto } from './idea.dto';

@Controller('idea')
export class IdeaController {
  constructor(private service: IdeaService) {
  }

  @Get()
  showAllIdeas() {
    return this.service.showAll();
  }

  @Post()
  createIdea(@Body() data: IdeaDto) {
    return this.service.createIdea(data);
  }

  @Get(':id')
  readIdea(@Param('id') id: string) {
    return this.service.read(id);
  }

  @Put(':id')
  updateIdea(@Param('id') id: string, @Body() data: Partial<IdeaDto>) {
    return this.service.update(id, data);
  }

  @Delete(':id')
  destroyIdea(@Param('id') id: string) {
    return this.service.destroy(id);
  }
}
