const app = require('./app');
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

const Container = require('./Container');
const Messages = require('./Messages');

io.on('connection', async (socket) => {
  console.log('a user connected');

  socket.emit('products', await Container.getProducts());

  socket.on('new-product', async (product) => {
    await Container.addProduct(product);
    io.sockets.emit('products', await Container.getProducts());
  });

  socket.on('new-message', async (message) => {
    await Messages.addMessage(message);
    io.sockets.emit('messages', await Messages.getMessages());
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

const port = 3000;

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
