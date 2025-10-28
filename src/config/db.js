import mongoose from 'mongoose';
import 'dotenv/config'; 
let db = null;

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: 10,
    });
    db = conn.connection.db;
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export async function testConnection() {
  try {
    if (!db) {
      throw new Error('Database connection not established');
    }
    await db.admin().ping();
    console.log('Successful connected');
    return true;
  } catch (error) {
    console.error('Connect DB error:', error);
    return false;
  }
}

export { db };