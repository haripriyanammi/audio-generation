"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const audioRoutes_1 = __importDefault(require("./routes/audioRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middleware to parse JSON requests
app.use(express_1.default.json());
// Use audio routes
app.use('/api/audio', audioRoutes_1.default);
// Start the server
app.listen(8000, () => {
    console.log(`Server is running on port ${8000}`);
});
exports.default = app;
