import {} from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

export const createStorage = (dest: string) =>
  diskStorage({
    destination: dest,
    filename(req, file, callback) {
      const name = file.originalname.split('.')[0];
      const fileExtName = extname(file.originalname);
      const randomName = Array(4)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
      console.log('true');
      callback(null, `${name}-${randomName}${fileExtName}`);
    },
  });
