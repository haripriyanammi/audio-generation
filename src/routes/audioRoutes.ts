import express from 'express';
import { generateAudio } from '../controllers/audiocontrollers';

const router = express.Router();

// Route to handle audio generation
router.post('/generate-audio', generateAudio);

export default router;