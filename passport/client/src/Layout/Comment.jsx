
const Comment = ({nombre, comentario = "", titulo = "", fecha = 0}) => { 
    
    return (
        <div className="py-6">
            <div>
               
                <h4 className="font-bold text-lg">{titulo}</h4>
                <p className="font-light py-2">{comentario}</p>
                <p className="font-light text-xs">{nombre} | {fecha} | comprador verificado</p>
            </div>
        </div>
    )
}
export default Comment;