import sharp from 'sharp';
import path from 'path';
import { Request, Response } from 'express';

// Prepare directories
const fullDir = path.join(__dirname, '/../../public/assets/full/');
const thumbDir = path.join(__dirname, '/../../public/assets/thumb/');

const imageProcess = (req: Request, res: Response, next: Function) => {
  console.log("processing");
  const width = Number(req.query.width);
  const height = Number(req.query.height);

  sharp(fullDir + req.query.filename)
    .resize(width as number, height as number)
    .toFile(thumbDir + 'lol.png', (err) => {
      if (err) console.log(err);
      else next();
    });
};

const sendImage = (req: Request, res: Response, next: Function) => {
  res.sendFile(path.join(thumbDir, req.query.filename as string), (err) => {
    if (err) {
      next();
    } else {
      console.log('Sent:', req.query.filename);
    }
  });
};

const checkImageExistence = async (req: Request, res: Response, next: Function) => {
  const width = Number(req.query.width);
  const height = Number(req.query.height);
  let data = await sharp(thumbDir + req.query.filename).metadata();
  if(data.width==width && data.height==height){
    sendImage(req,res,next);
  }else{
    next();
  }
};

export { imageProcess, sendImage, checkImageExistence };
