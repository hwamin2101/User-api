const RoomManager = {
  handle(socket, onlineUsers, io) {
    socket.on('room:join', ({ roomId }) => {
      socket.join(roomId);
      console.log(`${socket.user.email} joined room: ${roomId}`);

      const members = this.getMembers(roomId, onlineUsers, socket);
      
      
      socket.emit('room:joined', { roomId, members });

      // noti to members
      socket.to(roomId).emit('room:user-joined', {
        user: socket.user,
        message: `${socket.user.name || socket.user.email} đã tham gia`
      });

      // update mem list
      io.to(roomId).emit('room:members', members);
    });

    socket.on('room:leave', ({ roomId }) => {
      socket.leave(roomId);
      console.log(`${socket.user.email} left room: ${roomId}`);

      const members = this.getMembers(roomId, onlineUsers, socket);
      io.to(roomId).emit('room:members', members);
      socket.to(roomId).emit('room:user-left', {
        user: socket.user,
        message: `${socket.user.name || socket.user.email} đã rời phòng`
      });
    });

    socket.on('room:message', ({ roomId, message }) => {
      const payload = {
        user: socket.user,
        message,
        timestamp: new Date()
      };

      io.to(roomId).emit('room:message', payload);
    });
  },

  getMembers(roomId, onlineUsers, socket) {
    const room = socket.adapter.rooms.get(roomId);
    if (!room) return [];
    return Array.from(room)
      .map(id => onlineUsers.get(id))
      .filter(Boolean);
  }
};

export default RoomManager;