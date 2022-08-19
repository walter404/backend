const Product = ({producto, precio, thumbnail }) => { 
    
    return (
        <div>       
            <img  src={thumbnail} alt={producto} />   
            <div >
                <a href="#">
                    <h5>{producto}</h5>
                </a>
            
                <div >
                    <span >${precio}</span>
                    <a href="#" >Agregar al carro</a>
                </div>
            </div>
    </div>
    )
}
export default Product;