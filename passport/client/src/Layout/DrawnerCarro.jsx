import carro from '../assets/carro-logo.svg'
import useSocket from '../hooks/useSockect';
import useRequest from '../hooks/useRequest';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { toggleDrawner } from "../redux/EditorSlice";
import { useEffect } from 'react';

const DrawnerCarro = () => {
  const carrito = useSelector((state) => state.carro.carrito);

  
  if(!carrito){ return <h1>Cargando...</h1>} 
  return (
    <div id="drawer-example" className="absolute z-40 h-full right-0 p-4 mt-40 overflow-y-auto bg-white w-96" tabIndex="-1" aria-labelledby="drawer-right-label">
        <h5 id="drawer-label" className="inline-flex items-center mb-4 text-lg mb-12 font-semibold text-gray-500 dark:text-gray-400">
       <img src={"carro"} className="w-10 mr-4" /> Carro de Compras</h5>
       {carrito.length &&
        carrito.map((obj)=>{
          console.log('Carro', obj );
          return(
            <li>{obj.producto} - {obj.precio}</li>
          )
        })
       }
       
</div>
  );
};

export default DrawnerCarro;
