import {
  Controller,
  Param,
  Post,
  Put,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Body, Get, HttpStatus, Req } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserService } from './user.service';
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/register')
  async createUser(@Res() res, @Req() req, @Body() body) {
    try {
      const { name, phone } = body;

      const userRegister = await this.userService.registerUser(name, phone);
      return res.status(HttpStatus.CREATED).send({
        message: 'User regisered successfully!!',
        status: 200,
        data: userRegister,
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).send({
        status: HttpStatus.BAD_REQUEST,
        message: error.message,
      });
    }
  }

  @Post('/login')
  async loginUser(@Res() res, @Req() req, @Body() body) {
    try {
      const login = await this.userService.userLogin(req.body.phone);
      const payload = { name: login.name, phone: login.phone };
      // const authToken = token(payload);

      return res.status(HttpStatus.OK).send({
        message: 'User logged in Successful',
        data: login,
        // token: authToken,
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).send({
        status: HttpStatus.BAD_REQUEST,
        message: error.message,
      });
    }
  }

  @Get('/all_users')
  async getUsers(@Res() res) {
    try {
      const users = await this.userService.getAllUsers();

      return res.status(HttpStatus.OK).send({
        message: 'Success',
        data: users,
        // token: authToken,
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).send({
        status: HttpStatus.NOT_FOUND,
        message: error.message,
      });
    }
  }

  // @Get('all_rooms/:senderId/:receiver')
  // async getAllRoomsData(
  //   @Res() res,
  //   @Param('senderId') senderId: string,
  //   @Param('receiver') receiver: string,

  @Post('/uploadImage/:id')
  @UseInterceptors(FileInterceptor('Image'))
  async uploadFile(
    @Param('id') id: string,
    @Res() res,
    @UploadedFile() Image: Express.Multer.File,
  ) {
    try {
      const user = await this.userService.userImage(Image.path, id);
      var userImage = Image;
      return res.status(200).send({
        message: 'Image Upload successfull',
        status: 200,
        data: userImage,
      });
    } catch (error) {
      console.log(error);

      //   return res.sendFile(join('/public/uploads', '/public/uploads'));
      res.status(400).send({
        message: 'Image Upload Failed',
        status: 400,
        data: error.message,
      });
    }
  }
}
