import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Op } from 'sequelize';
import { Room, Message } from '../../models';

@Injectable()
export class ChatService {
  async getRooms(room, revStr, sender, receiver): Promise<Room> {
    const getRoomData = await Room.findOne({
      where: { [Op.or]: [{ title: room }, { title: revStr }] },
    });
    if (getRoomData) {
      return getRoomData;
    } else {
      const roomData = await Room.create({ title: room, sender, receiver });
      if (!roomData) {
        throw new HttpException(
          'Something went wrong!, please try again',
          HttpStatus.BAD_REQUEST,
        );
      } else {
        return roomData;
      }
    }
  }

  async storeMsg({ message, sender, receiver, room }): Promise<Room> {
    const Msg = await Message.create({ message, sender, receiver, room });

    if (!Msg) {
      throw new HttpException(
        'Something went wrong!, please try again',
        HttpStatus.BAD_REQUEST,
      );
    } else {
      return Msg;
    }
  }

  async getMessages(sender, receiver): Promise<Room> {
    const msgs = await Message.findAll({
      [Op.or]: [
        {
          where: {
            [Op.and]: [{ receiver }, { sender }],
          },
        },
        {
          where: {
            [Op.and]: [{ sender: receiver }, { receiver: sender }],
          },
        },
      ],
    });
    if (msgs.length == 0) {
      throw new HttpException('no Messages found', HttpStatus.BAD_REQUEST);
    } else {
      return msgs;
    }
  }

  async getAllRooms(sender, receiver): Promise<Room> {
    console.log(sender, receiver);

    const roomdata = await Room.findOne({
      attributes: ['id'],
      where: {
        [Op.or]: [
          { [Op.and]: [{ receiver }, { sender }] },
          { [Op.and]: [{ receiver: sender }, { sender: receiver }] },
        ],
      },
    });

    if (!roomdata) {
      return {
        message: 'Success',
        data: {
          id: 0,
        },
      };
    } else {
      return roomdata;
    }
  }
}
