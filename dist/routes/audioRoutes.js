"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const audiocontrollers_1 = require("../controllers/audiocontrollers");
const router = express_1.default.Router();
// Route to handle audio generation
router.post('/generate-audio', audiocontrollers_1.generateAudio);
exports.default = router;
