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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAudio = void 0;
const openaiServices_1 = require("../services/openaiServices");
const aws_1 = __importDefault(require("../uitils/aws"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const uuid_1 = require("uuid");
const generateAudio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { text, voice } = req.body;
        if (!text) {
            return res.status(400).json({ error: 'Text is required' });
        }
        const expandedText = yield (0, openaiServices_1.generateExpandedText)(text);
        const filename = `${(0, uuid_1.v4)()}.mp3`;
        const audioPath = path_1.default.join(__dirname, '../../audio', filename);
        yield (0, openaiServices_1.convertTextToSpeech)(expandedText, audioPath, voice);
        const fileContent = fs_1.default.readFileSync(audioPath);
        const uploadParams = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: filename,
            Body: fileContent,
            ContentType: 'audio/mpeg',
        };
        const data = yield aws_1.default.upload(uploadParams).promise();
        fs_1.default.unlinkSync(audioPath);
        return res.status(200).json({ audioUrl: data.Location });
    }
    catch (error) {
        console.error('Audio generation error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});
exports.generateAudio = generateAudio;
