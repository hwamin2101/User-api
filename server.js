import express, { json } from 'express';
import userRoutes from './routes/userRoutes.js';
import { connectDB } from './config/db.js';

const app = express();
app.use(json()); 
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url} - Body:`, req.body);
  next();
});

app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server đang chạy tại http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Lỗi khởi động server:', error);
    process.exit(1);
  }
};

startServer();