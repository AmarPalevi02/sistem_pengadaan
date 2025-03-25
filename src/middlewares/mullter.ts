import multer, { FileFilterCallback } from 'multer';
import { Request } from 'express';
import path from 'path';

const storage = multer.diskStorage({
   destination: (req, file, cb) => {
      cb(null, 'public/ReceivingDocument/');
   },
   filename: (req, file, cb) => {
      const uniqueSuffix = Math.floor(Math.random() * 99999999);
      cb(null, `${uniqueSuffix}_${file.originalname}`);
   },
});

const fileFilter = (
   req: Request,
   file: Express.Multer.File,
   cb: FileFilterCallback
) => {
   if (
      file.mimetype === 'image/jpeg' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/png'
   ) {
      cb(null, true);
   } else {
      cb(null, false)
   }
};


const uploadMiddleware = multer({
   storage: storage,
   limits: {
      fileSize: 3 * 1024 * 1024,
   },
   fileFilter: fileFilter,
});

export default uploadMiddleware;
