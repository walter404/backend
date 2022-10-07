const CartElement = ({ id, producto, precio, thumbnail }) => {
    return (
        <div className="flex justify-between">
            <img className="rounded-t-lg w-full" src={thumbnail} alt={producto} />   
            <h5 className="text-xl my-4 font-semibold tracking-tight text-gray-900 dark:text-white">{producto}</h5>
            <div>
                <h5>
                    ${precio}
                </h5>           
                <button onClick={handleDelete} className="text-white p-2 bg-gradient-to-r from-red-500 to-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm ml-4  text-center "><DeleteIcon className="w-6" /></button>                      
            </div>
        </div>
    )
}
export default CartElement