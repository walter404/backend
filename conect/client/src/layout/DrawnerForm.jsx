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
        <div className="relative z-0 mb-6 w-full group">
            <input type="text" name="producto" id="producto" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" onChange={(e) => setProducto(e.currentTarget.value)} placeholder="" required />
            <label for="producto" >Nombre del producto</label>
        </div>      
        <div className="relative z-0 mb-6 w-full group">
            <input type="number" name="precio" id="precio" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " onChange={(e) => setPrecio(e.currentTarget.value)} min="1" required />
            <label for="precio" >Precio</label>
        </div>  
        <div className="relative z-0 my-10 w-full group">
            <input type="text" name="thumbnail" id="thumbnail" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="" onChange={(e) => setThumbnail(e.currentTarget.value)} required />
            <label for="thumbnail" >Url de la imagen</label>
        </div>       
        <button type="button" onClick={doRequest} >Agregar Zapa</button>
        </form>
    </div>
  );
};

export default DrawnerForm;