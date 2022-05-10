"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var imageAPI_1 = __importDefault(require("./api/imageAPI"));
var routes = express_1.default.Router();
routes.get('/', function (req, res) {
    res.send('Welcome to our image processing api please provide image name or url and widrh and height parameters');
});
routes.use('/image', imageAPI_1.default);
exports.default = routes;
