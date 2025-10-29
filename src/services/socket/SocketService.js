import RoomManager from './RoomManager.js';
import NotificationHandler from './NotificationHandler.js';
import StateSyncHandler from './StateSyncHandler.js';

class SocketService {
  static onlineUsers = new Map(); 
  static io = null; 

  static init(io) {
    this.io = io;
    this.onlineUsers = new Map();

    io.on('connection', (socket) => {
      const user = socket.user;
      if (!user) {
        socket.disconnect(true);
        return;
      }

      this.onlineUsers.set(socket.id, user);
      console.log(`User connected: ${user.name || user.email} (${socket.id})`);

      socket.emit('server:online-users', Array.from(this.onlineUsers.values()));
      socket.broadcast.emit('user:online', user);

      // === ROOM ===
      RoomManager.handle(socket, this.onlineUsers, this.io);

      // === NOTIFICATION ===
      NotificationHandler.handle(socket, this.onlineUsers);

      // === STATE SYNC ===
      StateSyncHandler.handle(socket, this.io);

      // === DISCONNECT ===
      socket.on('disconnect', () => {
        this.onlineUsers.delete(socket.id);
        socket.broadcast.emit('user:offline', user);
        this.io.emit('server:online-users', Array.from(this.onlineUsers.values()));
        console.log(`User disconnected: ${user.name || user.email}`);
      });
    });
  }
}

export default SocketService;