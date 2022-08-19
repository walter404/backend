import { useId } from "react";
import { useState, useEffect } from "react";
import useSocket from "../hooks/useSockect";
import Product from './Product';

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
            <div >
            {products.map((obj,index)=>{
                return (
                    <Product key={`${id}-${index}`} producto={obj.producto} precio={obj.precio} thumbnail={obj.thumbnail} id={obj.id} />
                )          
            })}
            </div>
    )
}
export default Products;