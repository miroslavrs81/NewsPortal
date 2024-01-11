import { v4 as uuidv4 } from 'uuid';
import { diskStorage } from 'multer';
import { extname, join } from 'path';

export const newsImagesStorage = {
  storage: diskStorage({
    destination: (req, file, cb) => {
      const destination = join(__dirname, '../../uploads/newsimages/');
      cb(null, destination);
    },
    filename: (req, file, cb) => {
      const filename = uuidv4();
      const extension = extname(file.originalname);
      cb(null, filename + extension);
    },
  }),
};
