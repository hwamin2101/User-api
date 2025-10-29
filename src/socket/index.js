import { socketAuth } from '../middleware/authMiddleware.js'; 
import SocketService from '../services/socket/SocketService.js'; 

const initSocket = (io) => {
  io.use(socketAuth);           
  SocketService.init(io);       
  console.log('Socket.IO initialized with JWT auth');
};

export default initSocket;