const socket = io();

function renderProducts(products) {
  const productsContainer = document.getElementById('products');
  productsContainer.innerHTML = '';
  products.forEach((product) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${product.title}</td><td>${product.price}</td><td>${product.thumbnail}</td>`;
    productsContainer.appendChild(tr);
  });
}

socket.on('products', (products) => {
  console.log(products);
  renderProducts(products);
});

function addProduct(e) {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const price = document.getElementById('price').value;
  const thumbnail = document.getElementById('thumbnail').value;
  socket.emit('new-product', { title, price, thumbnail });
  return false;
}

function renderMessages(messages) {
  const messagesContainer = document.getElementById('messages');
  messagesContainer.innerHTML = '';
  messages.forEach((message) => {
    const li = document.createElement('li');
    li.innerHTML = `${message.timestamp} - ${message.email} - ${message.message}`;
    messagesContainer.appendChild(li);
  });
}

socket.on('messages', (messages) => {
  console.log(messages);
  renderMessages(messages);
});

function addMessage(e) {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;
  const timestamp = Date.now();
  socket.emit('new-message', { timestamp, email, message });
  return false;
}
