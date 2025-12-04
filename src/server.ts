import express from 'express';
import dotenv from 'dotenv';
import audioRoutes from './routes/audioRoutes';
dotenv.config();

const app = express();


// Middleware to parse JSON requests
app.use(express.json());

// Use audio routes
app.use('/api/audio', audioRoutes);

// Start the server
app.listen(8000, () => {
  console.log(`Server is running on port ${8000}`);
});

export default app;