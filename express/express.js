const express = require('express');
const app = express();
const fs = require('fs');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/api/products', (req,res)=>{
    fs.readFile('./products.json', (err, data)=>{
        if (err) throw err;
        res.send(JSON.parse(data));
    });
});

app.get('/api/products/:id', (req, res)=>{
    fs.readFile('./products.json', (err, data)=>{
        if (err) throw err;
        let products = JSON.parse(data);
        let product = products.find((product)=> product.id === +req.params.id);
        res.send(product);
    });
});

app.post('/app/products', (req, res)=>{
    fs.readFile('./products.json', (err, data)=>{
        if (err) throw err;
        let products = JSON.parse(data);
        let newProduct = {...req.body, id: products.length + 1};
        products.push(newProduct);
        fs.writeFile(
            './products.json',
            JSON.stringify(products, null, 2),
            (err)=>{
                if(err) throw err;
                res.send(newProduct)
            }
        );
    });
});

app.put('/api/products/:id', (req, res)=>{
    fs.readFile('./products.json', (err, data)=>{
        if (err) throw err;
        let products = JSON.parse(data);
        let product = products.find((product) => product.id === +req.params.id);
        if (product) {
            product.nombre = req.body.nombre;
            product.precio = req.body.precio;
            product.thumbnail = req.body.thumbnail;
            fs.writeFile(
                './products.json',
                JSON.stringify(products, null, 2),
                (err) => {
                    if (err) throw err;
                    res.send(product)
                }
            );
        } else {
            res.send('producto no encontradi')
        }
    });
});

app.delete('/api/products/:id', (req, res)=>{
    fs.readFile('./products.json', (err, data)=>{
        if ( err) throw err ;
        let products = JSON.parse(data);
        let product = products.find((product) => product.id === +req.params.id);
        if(product){
            let newProducts = products.filter(
                (product) => product.id !== +req.params.id
            );
            fs.writeFile(
                './products.json',
                JSON.stringify(newProducts, null, 2),
                (err) => {
                    if (err) throw err;
                    res.send('Producto eleminado');
                }
            );
        } else {
            res.send('Producto no encontrado')
        }
    });
});


const PORT = 8080;

const server = app.listen(PORT, ()=>{
    console.log(`Escuchando en el puerto: ${server.address().port}`)
});

server.on('error', err=> console.log(err));