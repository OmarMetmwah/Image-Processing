import express from 'express';
import imageAPI from './api/imageAPI';
import { Request, Response } from 'express';

const routes = express.Router();

routes.get('/', (req: Request, res: Response): void => {
  res.send(
    'Welcome to our image processing api please provide image name or url and widrh and height parameters'
  );
});
routes.use('/image', imageAPI);
export default routes;
