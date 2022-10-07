import { useId } from "react";
import { useState, useEffect } from "react";
import useSocket from "../hooks/useSockect";
import Product from './Product';
import ModalConfirm from "./modalConfirm";

const Products = (props = []) => {
    const [products, setProducts] = useState([]);
    const {isConnected, received} = useSocket({
        listen: 'productos',
    })
    useEffect(() => {
        if(isConnected && received!=[]){
            setProducts(received[0])        
        }
    }, [received])
    const id = useId();
    if( products.length === 0){
        return <div>Cargando...</div>
    }
    return (
            <div className="p-5 flex flex-wrap justify-around	">
                        <ModalConfirm  />

            {products.map((obj,index)=>{
                return (
                    <Product key={`${id}-${index}`} producto={obj.producto} precio={obj.precio} thumbnail={obj.thumbnail} id={obj.id} />
                )          
            })}
            </div>
    )
}
export default Products;