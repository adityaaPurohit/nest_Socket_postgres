import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import e from 'express';
import { where } from 'sequelize/types';
import { User, Room } from '../../models';
@Injectable()
export class UserService {
  async registerUser(name, phone): Promise<User> {
    const isExist = await User.findOne({ where: { phone } });

    if (isExist) {
      throw new HttpException('User is already exist!!', HttpStatus.FORBIDDEN);
    } else {
      const createUser = await User.create({ name, phone });
      if (!createUser) {
        throw new HttpException(
          'Something went wrong!, please try again',
          HttpStatus.BAD_REQUEST,
        );
      } else {
        return createUser;
      }
    }
  }
  async userLogin(phone): Promise<User> {
    const isExist = await User.findOne({ where: { phone } });

    if (!isExist) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    } else {
      return isExist;
    }
  }

  async getAllUsers(): Promise<User> {
    const usersList = await User.findAll({});

    if (usersList.length == 0) {
      throw new HttpException('No data found', HttpStatus.BAD_REQUEST);
    } else {
      return usersList;
    }
  }

  async userImage(Image, id): Promise<User> {
    const updateUser = await User.update({ Image: Image }, { where: { id } });

    if (updateUser == 0) {
      throw new HttpException('No data found', HttpStatus.BAD_REQUEST);
    } else {
      return updateUser;
    }
  }
}
