import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { Request, Response } from 'express';
import { NextFunction } from 'express-serve-static-core';

// Prepare directories
const fullDir = path.join(__dirname, '/../../public/assets/full/');
const thumbDir = path.join(__dirname, '/../../public/assets/thumb/');

const imageProcess = (req: Request, res: Response, next: NextFunction) => {
  const width = Number(req.query.width);
  const height = Number(req.query.height);
  const name = req.query.filename + '.jpg';

  sharp(fullDir + name)
    .resize(width as number, height as number)
    .toFile(thumbDir + name, (err) => {
      if (err) res.send({ err: 'File Not Found' });
      else next();
    });
};

const sendImage = (req: Request, res: Response, next: NextFunction) => {
  const name = req.query.filename + '.jpg';
  res.sendFile(path.join(thumbDir, name), (err) => {
    if (err) {
      res.send('Error while uploading');
    }
  });
};

// Check if required image with specific dimentions is already in the cache
// If it exist then send this image to the user
// Else go to the following middleware
const checkImageExistence = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const width = Number(req.query.width);
  const height = Number(req.query.height);
  const name = req.query.filename + '.jpg';

  fs.exists(thumbDir + name, async (isExist) => {
    if (isExist) {
      //if image exists
      const data = await sharp(thumbDir + name).metadata();
      if (data.width == width && data.height == height) {
        //check if the dimentions of existing file is the same as provided
        sendImage(req, res, next);
      } else {
        next();
      }
    } else {
      next();
    }
  });
};

export { imageProcess, sendImage, checkImageExistence };
