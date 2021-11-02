import { OnGatewayConnection, OnGatewayInit } from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { OnGatewayDisconnect } from '@nestjs/websockets';
import { WebSocketServer } from '@nestjs/websockets';
import { ChatService } from './chat.service';

@WebSocketGateway()
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private chatService: ChatService) {}

  @WebSocketServer() wss: Server;
  private logger: Logger = new Logger('ChatGateway');
  afterInit(server: Server) {
    this.logger.log('Initialized !');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`client disconnected : ${client.id}`);
    console.log(`disconnected : ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`client connected : ${client.id}`);
    console.log(`connected : ${client.id}`);
  }

  @SubscribeMessage('msgToServer')
  async handleMessage(client: Socket, { message, sender, receiver, room }) {
    try {
      const revStr = room.split('').reverse().join('');
      const allRooms = await this.chatService.getRooms(
        room,
        revStr,
        sender,
        receiver,
      );

      const createMsg = await this.chatService.storeMsg({
        message,
        sender,
        receiver,
        room: allRooms.id,
      });

      client.join(allRooms.title);
      this.wss.to(allRooms.title).emit('msgToClient', createMsg);
    } catch (error) {
      console.log(error);
    }
  }
}
