import express from 'express';
import dotenv from 'dotenv';
import audioRoutes from './routes/audioRoutes';
dotenv.config();

const app = express();
//const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Use audio routes
app.use('/api/audio', audioRoutes);

// Start the server
app.listen(5000, () => {
  console.log(`Server is running on port ${5000}`);
});

export default app;