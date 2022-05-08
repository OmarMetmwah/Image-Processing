import path from 'path';
import express from 'express';
import routes from './routes/index';

const app = express();

const port = 3000;

/////test
// import sharp from 'sharp';
// const fullDir = path.join(__dirname, '/../public/assets/full/');
// const thumbDir = path.join(__dirname, '/../public/assets/thumb/');
// (async function () {
//   try{
// await sharp(path.join(fullDir,"lol.png")).resize(10, 10).png().toFile(thumbDir+"lol.png", (err, info) => { console.log(">>>"+err) });

//   }catch(err){
//     console.log(err);
//   }

// } )();

/////

// Prepare Directories
const publicDir = path.join(__dirname, '../public');

//Setup static directory to serve
app.use(express.static(publicDir));

app.use('/api', routes);

app.listen(port, () => {
  console.log('Server is up on port 3000.');
});
