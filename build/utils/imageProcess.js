"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkImageExistence = exports.sendImage = exports.imageProcess = void 0;
var sharp_1 = __importDefault(require("sharp"));
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
// Prepare directories
var fullDir = path_1.default.join(__dirname, '/../../public/assets/full/');
var thumbDir = path_1.default.join(__dirname, '/../../public/assets/thumb/');
var imageProcess = function (req, res, next) {
    var width = Number(req.query.width);
    var height = Number(req.query.height);
    var name = req.query.filename + '.jpg';
    (0, sharp_1.default)(fullDir + name)
        .resize(width, height)
        .toFile(thumbDir + name, function (err) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (err) {
                try {
                    res.send({ err: 'File Not Found' });
                }
                catch (e) {
                    //for unit testing
                    req.query.msg = 'File Not Found';
                }
            }
            else {
                req.query.msg = 'Processed'; //for unit testing
                next();
            }
            return [2 /*return*/];
        });
    }); });
};
exports.imageProcess = imageProcess;
var sendImage = function (req, res) {
    var name = req.query.filename + '.jpg';
    res.sendFile(path_1.default.join(thumbDir, name), function (err) {
        if (err) {
            res.send('Error while uploading');
        }
    });
};
exports.sendImage = sendImage;
// Check if required image with specific dimentions is already in the cache
// If it exist then send this image to the user
// Else go to the following middleware
var checkImageExistence = function (req, res, next) {
    var width = Number(req.query.width);
    var height = Number(req.query.height);
    var name = req.query.filename + '.jpg';
    fs_1.default.exists(thumbDir + name, function (isExist) { return __awaiter(void 0, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!isExist) return [3 /*break*/, 2];
                    return [4 /*yield*/, (0, sharp_1.default)(thumbDir + name).metadata()];
                case 1:
                    data = _a.sent();
                    if (data.width == width && data.height == height) {
                        //check if the dimentions of existing file is the same as provided
                        sendImage(req, res);
                    }
                    else {
                        next();
                    }
                    return [3 /*break*/, 3];
                case 2:
                    next();
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    }); });
};
exports.checkImageExistence = checkImageExistence;
