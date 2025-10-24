export const errorHandler = (req, res) => {
  res.writeHead(500, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ success: false, message: 'Internal server error' }));
};