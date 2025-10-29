import express, { json } from 'express';
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import {Server} from 'socket.io';
import userRoutes from './routes/userRoutes.js';
import { connectDB } from './config/db.js';
import initSocket from './socket/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const server = http.createServer(app);
const io = new Server(server,{
  cors: {
    origin: process.env.PORT || 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

app.use(express.static(path.join(__dirname, 'public')));

app.use(json()); 
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url} - Body:`, req.body);
  next();
});

app.use('/api/users', userRoutes);
initSocket(io);

const PORT = process.env.PORT || 3000;



const startServer = async () => {
  try {
    await connectDB();
    server.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
};

startServer(); 