import { useSelector} from 'react-redux'

const Cart = () =>{
    const cart = useSelector((state) => state.carro.cart);
    console.log('cart', cart)
    return (
        <div className='relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12'>
            <h1 className="text-lg">Carro de compras</h1>
           {cart.map(()=>{
                return <h1>hola</h1>
           })}
        </div>                
    )
}

export default Cart