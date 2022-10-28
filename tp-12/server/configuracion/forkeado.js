const bigO = (cantidad) => {
  const randomNumbers = [];
  for (let i = 0; i < cantidad; i++) {
    const numbers = Math.floor(Math.random() * 1000 + 1);
    randomNumbers.push(numbers);
  }
  console.log(randomNumbers);
  const repetidos = {};
  randomNumbers.forEach(function (x) {
    repetidos[x] = (repetidos[x] || 0) + 1;
  });
  console.log(repetidos);
  return repetidos;
};


process.on("message", (cantidad) => {
console.log(cantidad);
const randomNumbers = bigO(cantidad);


process.send(randomNumbers);
});