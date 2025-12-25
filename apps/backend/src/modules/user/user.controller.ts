import { Types } from 'mongoose';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { MulterField } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

import { CreateUserDto, UpdateUserDto, UserResponseDto } from './dto/user.dto';
import { UpdateUserInfoDto } from './dto/user_info.dto';
import { UserService } from './user.service';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRoles } from 'src/common/constants/enums';
import { UserMatchGuard } from 'src/common/guards/user_match.guard';
import { UserInfoService } from './user_info.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { FILE_UPLOAD_KEYS } from 'src/common/constants';
import { AllowAdmin } from 'src/common/decorators/admin.decorator';

const FILE_FIELDS: MulterField[] = [
  FILE_UPLOAD_KEYS.PROFILE,
  FILE_UPLOAD_KEYS.CITIZENSHIP,
  FILE_UPLOAD_KEYS.NATIONAL_ID,
  FILE_UPLOAD_KEYS.LICENSE,
  FILE_UPLOAD_KEYS.PASSPORT,
].map(name => ({ name, maxCount: 1 }));

@Controller('/api/user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly userInfo: UserInfoService,
  ) {}

  // Only 'admin' can create 'authority' users
  @Post()
  @Roles([UserRoles.ADMIN])
  async createAuthority(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
    return await this.userService.createUser({ ...createUserDto, role: UserRoles.AUTHORITY });
  }

  // Only 'user' and 'authority' can get their own user details - allow admin to get other users info
  @AllowAdmin()
  @UseGuards(UserMatchGuard)
  @Get(':id')
  async getById(@Param('id') id: string) {
    return await this.userInfo.findOne(id as unknown as Types.ObjectId);
  }

  // Only 'user' and 'authority' can update their 'email', 'phone', 'password'
  @Roles([UserRoles.USER, UserRoles.AUTHORITY])
  @UseGuards(UserMatchGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() data: UpdateUserDto) {
    return await this.userService.update(id as unknown as Types.ObjectId, data);
  }

  // Only 'user' can remove their own account
  @Roles([UserRoles.USER])
  @UseGuards(UserMatchGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.userService.delete(id as unknown as Types.ObjectId);
  }

  // Only 'user' and 'authority' can update their own details
  @Roles([UserRoles.USER, UserRoles.AUTHORITY])
  @UseGuards(UserMatchGuard)
  @UseInterceptors(FileFieldsInterceptor(FILE_FIELDS))
  @Put('/info/:id')
  async updateInfo(
    @Param('id') id: string,
    @Body() data: UpdateUserInfoDto,
    @UploadedFiles() files: Record<string, Express.Multer.File[]>,
  ) {
    return await this.userInfo.handleInfo(id as unknown as Types.ObjectId, data, files);
  }
}
