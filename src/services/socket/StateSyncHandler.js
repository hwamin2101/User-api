const StateSyncHandler = {
  handle(socket) {
    socket.on('state:typing', ({ roomId, isTyping }) => {
      socket.to(roomId).emit('state:typing', {
        userId: socket.user.id,
        isTyping
      });
    });

    socket.on('state:update', ({ roomId, state }) => {
      socket.to(roomId).emit('state:update', {
        user: socket.user,
        state
      });
    });
  }
};

export default StateSyncHandler;