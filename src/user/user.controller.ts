import { Body, Controller, Get, Post, UsePipes } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './user.dto';
import { ValidationPipe } from '../shared/validation.pipe';

@Controller()
@UsePipes(ValidationPipe)
export class UserController {
  constructor(
    private readonly service: UserService,
  ) {
  }

  @Get('api/users')
  showAllUsers() {
    return this.service.showAll();
  }

  @Post('login')
  login(@Body() data: UserDto) {
    return this.service.login(data);
  }

  @Post('register')
  register(@Body() data: UserDto) {
    return this.service.register(data);
  }

  // @Get(':id')
  // readIdea(@Param('id') id: string) {
  //   return this.service.read(id);
  // }
  //
  // @Put(':id')
  // updateIdea(@Param('id') id: string, @Body() data: IdeaDto) {
  //   this.logger.log(JSON.stringify(data))
  //   return this.service.update(id, data);
  // }
  //
  // @Delete(':id')
  // destroyIdea(@Param('id') id: string) {
  //   return this.service.destroy(id);
  // }
}
