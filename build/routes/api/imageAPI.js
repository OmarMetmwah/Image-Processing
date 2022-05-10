"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var imageProcess_1 = require("../../utils/imageProcess");
var imageAPI = express_1.default.Router();
// First use middleware to check if the image exist with same name and dimentions required
// If so send the image from the cache folder "thumb"
// Else Process the image and then send it to user
imageAPI.get('/', imageProcess_1.checkImageExistence, function (req, res, next) {
    if (!req.query.filename) {
        res.send({ err: 'You must provide filename' });
        return;
    }
    else if (!req.query.width || !Number(req.query.width)) {
        res.send({ err: 'You must provide numeric width parameter' });
        return;
    }
    else if (!req.query.height || !Number(req.query.height)) {
        res.send({ err: 'You must provide numeric height parameter' });
        return;
    }
    (0, imageProcess_1.imageProcess)(req, res, next);
}, imageProcess_1.sendImage);
exports.default = imageAPI;
