import { Body, Controller, Delete, Get, Logger, Param, Post, Put, UsePipes } from '@nestjs/common';
import { IdeaService } from './idea.service';
import { IdeaDto } from './idea.dto';
import { ValidationPipe } from '../shared/validation.pipe';

@Controller('idea')
@UsePipes(ValidationPipe)
export class IdeaController {
  private logger = new Logger(IdeaController.name);
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
  updateIdea(@Param('id') id: string, @Body() data: IdeaDto) {
    this.logger.log(JSON.stringify(data))
    return this.service.update(id, data);
  }

  @Delete(':id')
  destroyIdea(@Param('id') id: string) {
    return this.service.destroy(id);
  }
}
