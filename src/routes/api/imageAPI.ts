import express from 'express';

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
  async (req, res, next) => {
    if (!req.query.filename) {
      return res.send({ err: 'You must provide filename' });
    } else if (!req.query.width) {
      return res.send({ err: 'You must provide width' });
    } else if (!req.query.height) {
      return res.send({ err: 'You must provide height' });
    }
    await imageProcess(req, res, next);
  },
  sendImage
);

export default imageAPI;
