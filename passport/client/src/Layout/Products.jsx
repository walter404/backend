import { useId } from "react";
import { useState, useEffect } from "react";
import Product from './Product';
import ModalConfirm from "./modalConfirm";
import useRequest from '../hooks/useRequest';

const Products = (props = []) => {
    const [products, setProducts] = useState([]);
    const { doSend , errors  } = useRequest({
        url: "/api/productos",
        method: "get",
        onSuccess: (obj) => {
            setProducts(obj.productos);
        }
    });
    useEffect(() => {
        doSend()
    }, []) 
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