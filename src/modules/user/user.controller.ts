import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto, UserResponseDto } from './dto/user.dto';
import { UserService } from './user.service';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRoles } from 'src/common/constants/enums';

@Controller('/api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Roles([UserRoles.ADMIN])
  async create(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
    return await this.userService.createUser(createUserDto);
  }

  @Get()
  @Roles([UserRoles.AUTHORITY])
  async findAll(): Promise<UserResponseDto[]> {
    return await this.userService.findAll();
  }

  // @Get(':id')
  // async findOne(@Param('id') id: string): Promise<UserResponseDto> {
  //   return await this.userService.findOne(id);
  // }

  // @Put(':id')
  // async update(@Param('id') id: string, @Body() data: UpdateUserDto) {
  //   return await this.userService.update(id, data);
  // }

  // @Delete(':id')
  // async delete(@Param('id') id: string) {
  //   return await this.userService.delete(id);
  // }
}
