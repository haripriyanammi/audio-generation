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
exports.convertTextToSpeech = exports.generateExpandedText = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const fs_1 = __importDefault(require("fs"));
const openai_1 = require("openai");
const openai = new openai_1.OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});
// 1. EXPAND TEXT
const generateExpandedText = (inputText) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const response = yield openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
            {
                role: 'system',
                content: `
        You are a friendly AI voice assistant.
        - Your job is to turn short inputs into meaningful spoken sentences.
        - If the user gives a name, greet them.
        - If the user gives a topic like "weather" or "time", respond as if you're assisting.
        - Be polite, short, and conversational.

        Examples:
        - Input: "Hari Priya" → "Hello Hari Priya, how can I assist you today?"
        - Input: "weather" → "The weather looks great today. Would you like a full forecast?"
        - Input: "hello" → "Hi there! How can I help you?"
        `
            },
            { role: 'user', content: inputText }
        ],
        max_tokens: 100,
        temperature: 0.9
    });
    const expandedText = ((_a = response.choices[0].message.content) === null || _a === void 0 ? void 0 : _a.trim()) || '';
    return expandedText;
});
exports.generateExpandedText = generateExpandedText;
// 2. CONVERT TEXT TO AUDIO (OpenAI TTS)
const convertTextToSpeech = (text_1, filePath_1, ...args_1) => __awaiter(void 0, [text_1, filePath_1, ...args_1], void 0, function* (text, filePath, voice = 'nova' // default
) {
    const response = yield openai.audio.speech.create({
        model: 'tts-1',
        input: text,
        voice: voice,
    });
    const buffer = Buffer.from(yield response.arrayBuffer());
    fs_1.default.writeFileSync(filePath, buffer);
});
exports.convertTextToSpeech = convertTextToSpeech;
