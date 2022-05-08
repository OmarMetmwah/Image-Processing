import express from 'express';
import imageAPI from './api/imageAPI';
const routes = express.Router();

routes.get('/', (req, res) => {
  res.send(
    'Welcome to our image processing api please provide image name or url and widrh and height parameters'
  );
  ///////////////////////////////////////prepare view
});
routes.use('/image', imageAPI);
export default routes;
