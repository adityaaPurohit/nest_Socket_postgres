import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Module({
  imports: [
    MulterModule.register({
      fileFilter: (req, file, cb) => {
        if (
          file.mimetype === 'image/png' ||
          file.mimetype === 'image/jpg' ||
          file.mimetype === 'image/jpeg'
        ) {
          cb(null, true);
        } else {
          cb(null, false);
        }
      },
      storage: diskStorage({
        destination: function (req, file, cb) {
          cb(null, 'upload');
        },
        filename: function (req, file, cb) {
          cb(null, Date.now() + '_' + file.originalname);
        },
      }),
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
