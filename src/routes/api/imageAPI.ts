import express, { NextFunction } from 'express';
import { Request, Response } from 'express';

import {
  imageProcess,
  sendImage,
  checkImageExistence,
} from '../../utils/imageProcess';

const imageAPI = express.Router();

// First use middleware to check if the image exist with same name and dimentions required
// If so send the image from the cache folder "thumb"
// Else Process the image and then send it to user
imageAPI.get(
  '/',
  checkImageExistence,
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    if (!req.query.filename) {
      res.send({ err: 'You must provide filename' });
      return;
    } else if (!req.query.width || !Number(req.query.width)) {
      res.send({ err: 'You must provide numeric width parameter' });
      return;
    } else if (!req.query.height || !Number(req.query.height)) {
      res.send({ err: 'You must provide numeric height parameter' });
      return;
    }
    await imageProcess(req, res, next);
  },
  sendImage
);

export default imageAPI;
