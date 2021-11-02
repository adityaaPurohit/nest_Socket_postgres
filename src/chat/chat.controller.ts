import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
// import { token } from 'utils/jwt.auth.js';
@Controller('chat')
export class ChatController {
  constructor(
    private chatService: ChatService,
    private socketGatway: ChatGateway,
  ) {}

  @Get('all_messages/:senderId/:receiver')
  async getUsers(
    @Res() res,
    @Param('senderId') senderId: string,
    @Param('receiver') receiver: string,
  ) {
    try {
      const msges = await this.chatService.getMessages(senderId, receiver);

      return res.status(HttpStatus.OK).send({
        message: 'Success',
        data: msges,
        // token: authToken,
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).send({
        status: HttpStatus.NOT_FOUND,
        message: error.message,
      });
    }
  }

  @Get('all_rooms/:senderId/:receiver')
  async getAllRoomsData(
    @Res() res,
    @Param('senderId') senderId: string,
    @Param('receiver') receiver: string,
  ) {
    try {
      const roomdata = await this.chatService.getAllRooms(senderId, receiver);
      return res.status(HttpStatus.OK).send({
        message: 'Success',
        data: roomdata,
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).send({
        status: HttpStatus.NOT_FOUND,
        message: error.message,
      });
    }
  }

 
}
