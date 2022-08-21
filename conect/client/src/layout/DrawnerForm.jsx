import useSocket from '../hooks/useSockect';
import { useState } from 'react';

const DrawnerForm = () => {
    const [producto, setProducto] = useState("")
    const [precio, setPrecio] = useState(0)
    const [thumbnail, setThumbnail] = useState("")
    const {doRequest} = useSocket({
      room: 'producto',
      body: {
        producto,
        precio,
        thumbnail
      },  
    });
  return (
    <div id="drawer-example">
       <h5 id="drawer-label" >
       <img src={zapa} /> Ingresar Producto </h5>
       <form>
        <div >
            <input type="text" name="producto" id="producto"  onChange={(e) => setProducto(e.currentTarget.value)} placeholder="" required />
            <label for="producto" >Nombre del producto</label>
        </div>      
        <div >
            <input type="number" name="precio" id="precio"  placeholder=" " onChange={(e) => setPrecio(e.currentTarget.value)} min="1" required />
            <label for="precio" >Precio</label>
        </div>  
        <div>
            <input type="text" name="thumbnail" id="thumbnail" placeholder="" onChange={(e) => setThumbnail(e.currentTarget.value)} required />
            <label for="thumbnail" >Url de la imagen</label>
        </div>       
        <button type="button" onClick={doRequest} >Agregar Zapatilla</button>
        </form>
    </div>
  );
};

export default DrawnerForm;