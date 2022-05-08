"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var express_1 = __importDefault(require("express"));
var index_1 = __importDefault(require("./routes/index"));
var app = (0, express_1.default)();
var port = 3000;
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
var publicDir = path_1.default.join(__dirname, '../public');
//Setup static directory to serve
app.use(express_1.default.static(publicDir));
app.use('/api', index_1.default);
app.listen(port, function () {
    console.log('Server is up on port 3000.');
});
