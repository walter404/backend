import { useSelector, useDispatch } from 'react-redux'
import useRequest from '../hooks/useRequest';
import { toggleDrawner, updateBody, toggleModal,deleteId } from "../redux/EditorSlice";
import { addCart, deleteElementCart } from '../redux/carroSlice';
import EditIcon from "../assets/editIcon"
import DeleteIcon from "../assets/deleteIcon"

const Product = ({id, producto, precio, thumbnail }) => { 
    const dispatch = useDispatch()
    const carro = useSelector((state) => state.carro.carrito)
  
    
    // el fecth es para cualquier usuario, en este momento hardcodeo el usuairo 1, pero se podria modificar sin problemas
    const {doSend, errors} = useRequest({
        url: "/api/carro" ,
        method: "post",
        body: {idProducto: id, producto, precio, thumbnail, idUsuario: 1, timeStamp: Date.now()},
        onSuccess: () => dispatch(addCart({idProducto: id, producto, precio, thumbnail}))
      });
      const {doSend : doDelete, errors : errorDelete} = useRequest({
        url: `/api/carro/${id}/1` ,
        method: "delete",
        onSuccess: () => dispatch(deleteElementCart({id}))
      });
    const handleEdit = () => {
        dispatch(toggleDrawner())
        dispatch(updateBody({id, producto, precio, thumbnail, edit: true}))
    }
    const handleDelete = () => {
        dispatch(toggleModal())    
        dispatch(deleteId(id))        
    }
    const handleCart = () => {
        if(!carro.find((obj)=>obj.idProducto===id)){
            doSend();           
       }else{
            doDelete();
       }
       
    }
  
    
    const administrador = useSelector((state) => state.administrador.value)
    return (
        <>
            <div className=" bg-white transition ease-in-out delay-150 rounded-lg shadow-md w-80 m-4">  
                <img className="rounded-t-lg w-full" src={thumbnail} alt={producto} />   
                <div className="px-5 pb-5 ">
                    <div className='flex flex-row h-10 my-3 justify-between content-center items-center'>
                        <h5 className="text-xl my-4 font-semibold tracking-tight text-gray-900 dark:text-white">{producto}</h5>
                        {administrador && (
                            <div className='flex'>
                                <button onClick={handleEdit} className="text-white p-2 bg-gradient-to-br from-green-200 via-green-400 to-green-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm ml-4 text-center "><EditIcon className="w-6" /></button> 
                                <button onClick={handleDelete} className="text-white p-2 bg-gradient-to-r from-red-500 to-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm ml-4  text-center "><DeleteIcon className="w-6" /></button> 
                            </div>                       
                        )}
                    </div>            
                    <div className="flex justify-between items-center">
                        <span className="text-3xl font-bold text-gray-900 dark:text-white">${precio}</span>
                        {!carro.find((obj)=>obj.idProducto===id ? true : false) ?  <button onClick={handleCart} className="text-white bg-gradient-to-r from-sky-600 to-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm ml-4 px-5 py-2.5 text-center ">Agregar al carro</button> : <button  onClick={handleCart} className="text-white bg-gradient-to-r from-red-500 to-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm ml-4 px-5 py-2.5 text-center ">en el carro</button>}
                    </div>
                </div>
        </div>
    </>
    )
}
export default Product;