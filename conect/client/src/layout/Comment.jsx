const Comment = ({nombre, comentario = "", titulo = "", fecha = 0}) => { 
    
    return (
        <div className="py-6">
            <div>
               
                <h4 >{titulo}</h4>
                <p >{comentario}</p>
                <p>{nombre} | {fecha} | comprador verificado</p>
            </div>
        </div>
    )
}
export default Comment;