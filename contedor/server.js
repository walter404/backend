const http = require('http')


const server = http.createServer((peticion, respuesta)=>{
    const hora = new Date().getHours()
    if (6<= hora && hora<=12) {
        respuesta.end('buenos dias')
    } else if(13<= hora && hora<=19){
        respuesta.end('buenos tardes')
    } else if(20<= hora && hora<=5){
        respuesta.end('hola noches')
    }
    
})
const createServer = server.listen(8080, ()=>{
    //console.log(server.address())
    console.log(`Escuchando al puerto: ${server.address().port}`)
})