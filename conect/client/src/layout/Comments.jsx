import Comment from "./Comment";
import LeaveComment from "./leaveComment";
import { useId } from "react";
import { useState, useEffect } from "react";
import useSocket from "../hooks/useSockect";

const Comments = (props = []) => {
    const [comments, setComments] = useState([]);
    const {isConnected, received} = useSocket({
        listen: 'comentarios',
    })
    useEffect(() => {
        if(isConnected && received!=[]){
            console.log('se activo el broadcasting', comments)
            setComments(received[0])        
            console.log('el received', received[0]) 
        }
    }, [received])
    const id = useId();
    if(comments.length === 0){
        return <div>Cargando...</div>
    }
    console.log('el comments', comments)
    return (
        <footer className="footer">
            <div className="datos">
            {comments.map((obj,index)=>{
                return (
                    <Comment key={`${id}-${index}`} titulo={obj.titulo} fecha={obj.fecha} nombre={obj.nombre} comentario={obj.comentario} />
                )          
            })}
            </div>
            <LeaveComment />
        </footer>
    )
}
export default Comments;