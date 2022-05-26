import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { createStorage } from 'src/storage';
import { UserService } from './user.service';
import { updateUserDto } from './dto/update-user.dto';
import { createPath } from 'src/storage/utils';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  getUserById(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  getUsers() {
    return this.userService.findAllUsers();
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: createStorage('./public/images/avatars'),
    }),
  )
  updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: updateUserDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file) {
      return this.userService.updateUser(id, {
        ...updateUserDto,
        imagePath: createPath(file.path),
      });
    } else {
      return this.userService.updateUser(id, updateUserDto);
    }
  }
}
