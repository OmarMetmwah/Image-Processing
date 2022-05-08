import express from 'express';

import {
  imageProcess,
  sendImage,
  checkImageExistence,
} from '../../utils/imageProcess';
const imageAPI = express.Router();

imageAPI.get(
  '/',
  checkImageExistence,
  async (req, res, next) => {
    if (!req.query.filename) {
      return res.send({ error: 'You must provide filename' });
    } else if (!req.query.width) {
      return res.send({ error: 'You must provide width' });
    } else if (!req.query.height) {
      return res.send({ error: 'You must provide height' });
    }
    await imageProcess(req, res, next);
  },
  sendImage,
  (req, res) => {
    res.send(
      'Image Not found! please place correct name for the image with extention ex image.jpg'
    ); //////////////////////template
  }
);

export default imageAPI;
