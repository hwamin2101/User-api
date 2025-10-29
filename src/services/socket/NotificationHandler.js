const NotificationHandler = {
  handle(socket, onlineUsers) {
    socket.on('notification:send', ({ targetUserId, title, body }) => {
      for (const [socketId, user] of onlineUsers.entries()) {
        if (user.id === targetUserId) {
          socket.to(socketId).emit('notification:receive', {
            title,
            body,
            from: socket.user
          });
          break;
        }
      }
    });
  }
};
export default NotificationHandler;